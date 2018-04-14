
A simple script to set up a series of comp images.

View the [demo page](https://cdn.rawgit.com/bartels/adocomp/master/demo/).

**Usage:**  

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>ADOComp Demo</title>
<style>
body {
    margin: 0;
    padding: 0;
    background: black;
}

/* example styling container div */
#ADOComp {
    /* width: 1920px; */
}
</style>
</head>
<body>
<script src="https://cdn.rawgit.com/bartels/adocomp/master/dist/adocomp.min.js" type="text/javascript"></script>
<script>
  // pass in list of image urls
  ADOComp([
      '1.png',
      '2.png',
      '3.png',
  ])
</script>
</body>
</html>
```
