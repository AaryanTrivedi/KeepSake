##Users:                                    METHODS     URL                     USES TOKEN          DONE        FRONTEND
----------------------------------------------------------------------------------------------------------------------
-Create account                             POST        /users/register                               ye            ye
-OTP verification through mail/mobile       PATCH       /users/verify                                 ye            ye
-Login to account                           POST        /users/login                                  ye            ye
-Forgot Password selected                   POST        /users/forgot                                 ye            ye
-Forgot Password edit                       PATCH       /users/forgot/parsedID                        ye            
-Change Password                            PATCH       /users/change           token                 ye            ye
-Delete account                             PATCH       /users/                 token                 ye            ye
-Edit account                               PATCH       /users/edit             token                 ye            ye

##Posts:                                    METHODS     URL                     USES TOKEN           DONE       FRONTEND
---------------------------------------------------------------------------------------------------------------------------
-Add Posts                                  POST        /posts/add              token                  ye           ye
-Edit Posts                                 PUT         /posts/edit/id          token
-Delete Posts                               PATCH       /posts/delete/id        token                  ye           ye
-Archive Posts                              PATCH       /posts/archive/id       token                  ye           ye
-Unarchive Posts                            PATCH       /posts/unarchive/id     token                  ye           ye
-Make Public                                PATCH       /posts/public/id        token                  ye           ye
-Make Private                               PATCH       /posts/private/id       token                  ye           ye
-View Personal Posts                        GET         /posts/my               token                  ye           ye
-View Archived Posts                        GET         /posts/archived         token                  ye           ye
-View All Posts                             GET         /posts/public           token                  ye           ye
-Like Post                                  PATCH       /posts/like/id          token                            



Password for emails : dcqj fpdm giwy kdyf 