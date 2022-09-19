// Email validation
export function validateEmail(email) {
    var match = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return match.test(String(email).toLowerCase());
}
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function parseData(data) {
  let latdegrees = (data.GPSLatitude[0].numerator) / (data.GPSLatitude[0].denominator);
  let latminutes = (data.GPSLatitude[1].numerator) / (data.GPSLatitude[1].denominator);
  let latseconds = (data.GPSLatitude[2].numerator) / (data.GPSLatitude[2].denominator);
  
  let latitude = latdegrees + (latminutes / 60) + (latseconds / 3600);
  
  if (data.GPSLatitudeRef === "S") {
  latitude = -latitude
  }
  
  let longdegrees = (data.GPSLongitude[0].numerator) / (data.GPSLongitude[0].denominator);
  let longminutes = (data.GPSLongitude[1].numerator) / (data.GPSLongitude[1].denominator);
  let longseconds = (data.GPSLongitude[2].numerator) / (data.GPSLongitude[2].denominator);
  
  let longitude = longdegrees + (longminutes / 60) + (longseconds / 3600);
  
  if (data.GPSLongitudeRef === "W") {
  longitude = -longitude
  }
  
  console.log(latitude + ", " + longitude)
  
  return [latitude, longitude]
  }

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
