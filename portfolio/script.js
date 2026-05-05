document.addEventListener('DOMContentLoaded', function(){
  const gallery = document.getElementById('gallery');
  // simple demo: list images in images/ if you add them manually
  const demo = document.createElement('p');
  demo.textContent = 'Add image files to the images/ folder and reference them in index.html or drop them here.';
  gallery.appendChild(demo);
});
