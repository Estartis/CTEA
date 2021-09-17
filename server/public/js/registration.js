
const registrationButton = document.querySelector('.registration');
const doneButton = document.querySelector('.done');
var currentDate = new Date();
function open_fullreg () {
    $(document).ready(function($) {
        $('.install-popup-close').click(function() {
            $(this).parents('.install-popup-fade').fadeOut();
            return false;
        });
    
        $('.install').click(function() {
            $(this).parents('.install-popup-fade').fadeOut();
            return false;
        });
    
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.install-popup-fade').fadeOut();
            }
        });
    
        $('.install-popup-fade').click(function(e) {
            if ($(e.target).closest('.install-popup').length == 0) {
                $(this).fadeOut();
            }
        });
    });

    $(document).ready(function($) {
            $('.install').click(function() {
            if (typeof window.ethereum !== 'undefined') {
                ethereum
                    .request({ method: 'eth_requestAccounts' })
                    .then()
                    .catch((err) => {
                        if (err.code === 4001) {
                            console.log('Please connect to MetaMask.');
                        } else {
                            console.log(err);
                    }
                });
            }
            else {
                window.open('https://metamask.io/download.html')
                window.onfocus = function() {
                    window.location.reload()
                }
            }
            })
            /*
            $('.nickname-popup-close').click(function() {
                $(this).parents('.nickname-popup-fade').fadeOut();
                return false;
            });
        
            $(document).keydown(function(e) {
                if (e.keyCode === 27) {
                    e.stopPropagation();
                    $('.nickname-popup-fade').fadeOut();
                }
            });
        
            $('.nickname-popup-fade').click(function(e) {
                if ($(e.target).closest('.nickname-popup').length == 0) {
                    $(this).fadeOut();
                }
            });
            $('.done').click(function() {
                if (document.getElementById("nickname").value !== '') {
                    var nickname = document.getElementById("nickname").value
                    set_cookie("nickname", nickname, (date.getFullYear+2), date.getMonth, date.getDay)
                }
                else {
                    alert('Please enter your nickname')
                }
            });
        */
    });
}
function open_nicknamereg() {
    $(document).ready(function($) {
        $('.nickname-popup-close').click(function() {
            $(this).parents('.nickname-popup-fade').fadeOut();
            return false;
        });

        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.nickname-popup-fade').fadeOut();
            }
        });

        $('.nickname-popup-fade').click(function(e) {
            if ($(e.target).closest('.nickname-popup').length == 0) {
                $(this).fadeOut();
            }
        });

        $('.done').click(function() {
            if (document.getElementById("nickname").value !== null) {
                var nickname = document.getElementById("nickname").value
                set_cookie("nickname", nickname, (currentDate.getFullYear()+2), currentDate.getMonth(), currentDate.getDay())
                window.location.href = `/game`
            }
            else {
                alert('Please enter your nickname')
            }
        });
    });
}
/*
function parseAddr () {
    if (typeof window.ethereum !== 'undefined') {
        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then()
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.log(err);
            }
    });
    }
    else {
        $('.install-popup-fade').fadeIn()
        open_fullreg()
    }
}
async function parseAddress () {
    setInterval(parseAddr,20)
}*/
function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
 
  if ( path )
        cookie_string += "; path=" + escape ( path );
 
  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}
function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ();  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
function account_check(accounts) {
    if (accounts.length !== 0 && get_cookie("nickname" !== undefined) && get_cookie("nickname" !== '')) {
        var nickname = get_cookie("nickname")
        var publkey = accounts[0]
        document.getElementById('publkey').value = publkey
        document.getElementById('nickname').value = nickname
        $('.nickname-popup-fade').fadeIn()
        open_nicknamereg()
    }
    else {
        if (get_cookie("nickname") === null) {
            var publkey = accounts[0]
            document.getElementById('publkey').value = publkey
            $('.nickname-popup-fade').fadeIn()
            open_nicknamereg()
        }
        else {
            document.getElementById('publkey').value = accounts[0]
            document.getElementById('nickname').value = get_cookie("nickname")
            $('.nickname-popup-fade').fadeIn()
            open_nicknamereg()
        }
    }
}
registrationButton.addEventListener('click', () => {
    if (typeof window.ethereum !== 'undefined') {
        document.getElementById('reg').innerHTML = "Sign In"
        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(account_check)
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.log(err);
                }
        });
    }
    else {
        $('.install-popup-fade').fadeIn()
        open_fullreg()
    }
});
