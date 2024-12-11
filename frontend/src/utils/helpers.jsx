export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function limitCharacters(event, maxLength) {
  const target = event.target;

  if (target.value.length > maxLength) {
    target.value = target.value.slice(0, maxLength); // Trim the excess characters
  }
}

export function fileDownloader(data, filename, filetype) {
  // Create a Blob object
  const blob = new Blob([JSON.stringify(data)], { type: filetype });

  // Create an anchor element and set attributes for download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Append to the document body, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
