<?php

class AccountModel
{
    var $values = array();
    
    var $username;
    var $password;
    var $password2;
    var $email;
    
    
    function AccountModel($values)
    {
        $this->values = $values;
        $this->username = $values['username'];
        $this->password = $values['password'];
        $this->password2 = $values['password2'];
        $this->email = $values['email'];
    }
}

?>
