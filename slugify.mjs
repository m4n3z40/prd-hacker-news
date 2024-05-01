export default function createSlug(str) {
  str = str.toLowerCase();
  str = str.trim();
  str = str.replace(/[^\w\s-]/g, '-');
  str = str.replace(/[_+]/g, '-');
  str = str.replace(/\s+/g, '-');
  str = str.replace(/--+/g, '-');

  return str;
}
