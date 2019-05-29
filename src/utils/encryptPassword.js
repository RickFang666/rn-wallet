import md5 from 'blueimp-md5';

export default function encryptPassword(password) {
  return md5(md5(password));
}
