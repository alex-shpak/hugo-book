(function() {
  const styles = getComputedStyle(document.documentElement);
  const cssVar = (name) => styles.getPropertyValue(name).trim();

  const theme = document.documentElement.dataset.theme ?? '';
  const darkMode = theme.endsWith('dark')
               || (theme.endsWith('auto') && matchMedia('(prefers-color-scheme: dark)').matches);

  const overrides =  JSON.parse(document.currentScript.dataset.config || '{}')
  const config = Object.assign({
    theme: 'base',
    themeVariables: {
      darkMode: darkMode,
      background: cssVar('--body-background'),
      primaryColor: cssVar('--gray-200'),
      primaryTextColor: cssVar('--body-font-color'),
      primaryBorderColor: cssVar('--gray-500'),
      lineColor: cssVar('--gray-500'),
      noteBkgColor: cssVar('--gray-100'),
      noteTextColor: cssVar('--body-font-color'),
    },
    fontFamily: 'inherit'
  }, overrides);

  mermaid.initialize(config);
})();
