//Logger useren ud og fjerner fra sessionstorage
sessionStorage.removeItem('loggedin');
sessionStorage.removeItem('bearer');
sessionStorage.removeItem('user_id');
sessionStorage.removeItem('username');
location.href = "index.html";