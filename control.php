<?php
include("connect.php");
class data{
    public function register($username,$fname,$lname,$address,$phonenumber,$password,$level){
        global $connect;
        $sql="insert into account(username,fname,lname,address,phonenumber,password,level) values('$username', '$fname', '$lname','$address', '$phonenumber', '$password','$level')";
        $run=mysqli_query($connect,$sql);
        return $run;
    }
    public function check_account($username){
        global $connect;
        $sql="select * from account where username='$username'";
        $run=mysqli_query($connect,$sql);
        $count=mysqli_num_rows($run);
        return $count;
    }
    public function login($username,$password){
        global $connect;
        $sql = "select * from account where username='$username' and password='$password'";
        $run = mysqli_query($connect,$sql);
        $count = mysqli_num_rows($run);
        return $count;
    }
    public function get_level($username){
        global $connect;
        $sql="select level from account where username='$username'";
        $run=mysqli_query($connect,$sql);
        return $run;
    }
}
?>