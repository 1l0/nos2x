import browser from 'webextension-polyfill'
import {Buffer} from 'buffer'
import {render} from 'react-dom'
import {getPublicKey} from 'nostr-tools'
import React, {useState, useEffect} from 'react'

function Popup() {
  let [key, setKey] = useState('')

  useEffect(() => {
    browser.storage.local.get('private_key').then(results => {
      if (results.private_key) {
        setKey(getPublicKey(results.private_key))
      } else {
        setKey(null)
      }
    })
  }, [])

  return (
    <>
      <h2>nos2x</h2>
      {key === null ? (
        <p style={{width: '150px'}}>
          you don't have a private key set. use the{' '}
          <a href="#" onClick={goToOptionsPage}>
            options page
          </a>{' '}
          to set one.
        </p>
      ) : (
        <>
          <p>your public key:</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              width: '100px'
            }}
          >
            <code>{key}</code>
          </pre>
          <p>
            <small>
              <a href="#" onClick={goToOptionsPage}>
                options
              </a>
            </small>
          </p>
        </>
      )}
    </>
  )

  function goToOptionsPage() {
    browser.tabs.create({
      url: browser.runtime.getURL('options.html'),
      active: true
    })
  }
}

render(<Popup />, document.getElementById('main'))
