<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
<br>
	<a class="btn btn-info" onclick="selectall(123)">Select All</a>
  <table id="test_123" class="table table-bordered table-stripped">
  	<tr><td>test1</td><td><input type="checkbox" id="chk_1" value="333" ></td></tr>
  	<tr><td>test2</td><td><input type="checkbox" id="chk_2" value="444" ></td></tr>
    <tr><td>test3</td><td><input type="checkbox" id="chk_3" value="555" ></td></tr>
  </table>
  
  <a class="btn btn-success" id="btn_123" onclick="approve(123)">Submit</a>
</div>

<script>

	function selectall(id){
    	$IDs = $("#test_"+id+" input:checkbox").map(function () {
    		return $(this).attr("id");
		}).get();
        
        console.log('select all',$IDs);
        
        for(var i=0;i<$IDs.length;i++)
        {
        	document.getElementById($IDs[i]).checked=true;
        }

    }




	function approve(id)
    {
    //alert(id)
    
    $IDs = $("#test_"+id+" input:checkbox:checked").map(function () {
    	return $(this).attr("id");
	}).get();
    
    console.log('demo',$IDs)
    
    
//    alert($IDs.length)
		var dataArray = [];
		if($IDs.length>0)
		{
			for(var j=0;j<$IDs.length;j++){
				dataArray.push($("#"+$IDs[j]).val())
            }
    		console.log(dataArray)
    	}
        else{
        	alert('select atleast 1');
        }
    
    	//$('#test_'+id).find('tr').each(function () {
        //var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked')) {
				
        //}
   /// });
    
    }
</script>
</body>


</html>
