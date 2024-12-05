const fileDownloader = (data, filename, filetype) => {
  // Create a Blob object
  const blob = new Blob([data], { type: filetype });

  // Create an anchor element and set attributes for download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Append to the document body, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default fileDownloader
