<?php
    echo "<h1>Popular Videos</h1>";
    echo "<h2>Videos which can entertain you</h2>";
    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $query = new MongoDB\Driver\Query([]);
    $cursor = $mng->executeQuery('youtubeDB.trends', $query);
    foreach ($cursor as $document) {
        $l = $document->id;
        echo nl2br("<h3><a href='https://www.youtube.com/watch?v=$l'><span style='color:white;font-size:25px'>$document->title\n</span></a></h3>");
        echo nl2br("<b><span style='color:white'>VideoId:</span></b> $document->id\n");
        echo nl2br("<b><span style='color:white'>VideoDescription:</span></b><p>$document->description</p>\n");
        echo nl2br("<b><span style='color:white'>ChannelID:</span></b> $document->channelId\n");
        echo nl2br("<b><span style='color:white'>Channel Title:</span></b> $document->channelTitle\n");
        echo nl2br("<b><span style='color:white'>Total Views:</span></b> $document->viewcount\n");
        echo nl2br("<b><span style='color:white'>Total Likes:</span></b> $document->likecount\n");
        echo nl2br("<b><span style='color:white'>Total Dislikes:</span></b> $document->dislikecount\n");
        echo nl2br(" \n");
        }
    
       $backimg="youtubeimage.jpg";
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Youtube Trends</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type ="text/css">
body {
background-image: url('<?php echo $backimg;?>');
}
</style>
</head>
<body>
   <header>
   </header>
</body>

</html>

</html>
