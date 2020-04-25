if (navigator.serviceWorker) {
  navigator.serviceWorker.register(
    "{{ "/sw.js" | relURL }}", 
    { scope: "{{ "/" | relURL }}" }
  );
}
