<!DOCTYPE html>
<html>
<body>
<script>
document.body.appendChild(document.createTextNode('This script is ran on the client side'));
</script>
<script preprocess>
var element = document.createElement('h1');
element.appendChild(document.createTextNode('hello world'));
document.body.insertBefore(element, document.body.firstChild);
</script>
</body>
</html>
