export default function Ajax(url, data) {
  let xhr = null;
  if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  let params = '';
  Object.keys(data).forEach(key => {
    params += `${key}=${data[key]}&`;
  });
  params = params.replace(/&$/, '');

  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}