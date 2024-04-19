const get_HTML = (txt) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YUMMY.SUPPORT.INDIA</title>
</head>

<body style="margin: 0;background-color: black;color: rgb(20, 220, 140);height:auto; padding:1rem;">

    <a href="https://cbbea992-89f1-42fc-9e3b-d9eec42f6fdb-00-9sftyse1nxkv.asia-b.replit.dev/"><img src="https://res.cloudinary.com/djj93px03/image/upload/v1704346166/logo_dyy4bt.png" style="height:10rem; rotate:2deg;"
   style="display:block; margin:auto;" /></a>
    <h1 style="font-size:0.7rem; text-align:center;">${txt}</h1>
</body>

</html>
    `;
};
module.exports = {get_HTML};
