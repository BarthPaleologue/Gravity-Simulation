<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gravity</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            padding: 0;
        }
        
        #renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
    </style>
</head>

<body>
    <canvas id="renderCanvas"></canvas>
    <script src="babylon4.js"></script>
    <script type="module">
        import { createEnv } from "./main"
        createEnv(<?php if(isset($_GET["n"])) { echo($_GET["n"]); } else { echo(10); } ?>);
    </script>
</body>

</html>