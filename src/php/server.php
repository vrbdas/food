<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Преобразует JSON в PHP
echo var_dump($_POST);