function getExtension(language) {
  const mapLang = {
    javascript: ".js",
    python: ".py",
    html: ".html",
    php: ".php",
    java: ".java",
    c: ".c",
    "c++": ".cpp",
    "c#": ".cs",
    ruby: ".rb",
    go: ".go",
    kotlin: ".kt",
    swift: ".swift",
    typescript: ".ts",
    css: ".css",
    shell: ".sh",
    sql: ".sql",
    r: ".r",
    perl: ".pl",
    dart: ".dart",
    rust: ".rs",
    scala: ".scala",
    xml: ".xml",
    json: ".json",
    yaml: ".yaml",
    markdown: ".md",
    txt: ".txt",
  };

  return mapLang[language] || ""; // Return empty string if the language is not found
}

export default getExtension;
