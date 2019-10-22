window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB

window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers

window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  )
}

const request = window.indexedDB.open('Kayla', 3)

request.onerror = function(event) {
  // Do something with request.errorCode!
}
request.onsuccess = function(event) {
  // Do something with request.result!
}
