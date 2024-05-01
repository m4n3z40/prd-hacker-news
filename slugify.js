function createSlug(str) {
  str = str.toLowerCase();
  str = str.replace(/[^\w\s-]/g, '');
  str = str.replace(/\s+/g, '-');
  str = str.replace(/--+/g, '-');
  str = str.trim();

  return str;
}

const args = process.argv.slice(2).join(' ');

console.log(createSlug(args));
