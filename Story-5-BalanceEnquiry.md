# View Account Balance on Enquiry Screen

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to view my current savings account balance
when I access the Balance Enquiry screen, so that I have real-time
visibility of my funds. The balance must be fetched securely from the
Core Banking Service and displayed in a clear, accessible format
consistent with the application\'s light theme.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**     **Action**      **Explanation**
  -------------- ----------------- --------------- -------------------------------------
  1              Balance Enquiry   Modify          Add UI elements to display the
                 Screen                            account balance and logic to fetch
                                                   data upon screen load.

  2              Core Banking      Integrate       A secure API call is required to
                 Service                           fetch the real-time Savings Account
                                                   Balance.

  3              UI Theming Engine Integrate       The new UI elements for displaying
                                                   the balance must correctly apply the
                                                   Light Theme.

                                                   

  Sl. No.        Name              Source          Data Type

  1              Balance Enquiry   System          Screen/View
                 Screen                            

  2              Savings Account   Core Banking    Decimal
                 Balance           Service         

  3              Light Theme       System          Configuration

                                                   

  ID             AC                Subject         Content

  M-01           04                Service         We could not retrieve your account
                                   Unavailable     balance at this time. Please try
                                                   again later.

  M-02           05                Balance         There was a problem retrieving your
                                   Unavailable     account details. Please contact
                                                   support if the issue persists.

                                                   

  User           System                            

  User navigates The system                        
  to the Balance initiates a                       
  Enquiry        secure call to                    
  screen.        the Core Banking                  
                 Service. The                      
                 service returns                   
                 the balance                       
                 successfully. The                 
                 system displays                   
                 the Savings                       
                 Account Balance                   
                 as                                
                 \"\$10,500.00\"                   
                 on the Balance                    
                 Enquiry Screen                    
                 within 1.5                        
                 seconds.                          

  Exception:     The system                        
  User navigates displays the                      
  to the Balance Service                           
  Enquiry        Unavailable Error                 
  screen, but    message (M-01) on                 
  the Core       the Balance                       
  Banking        Enquiry Screen.                   
  Service is                                       
  unreachable.                                     

                                                   

  Number         User              IDM             User Role
                 Classification    Authorization   

  1              Customer          Authenticated   Bank Customer
                                   Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  --------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business    **Error       **Test     **Page**
  No.**                                           Length**   Mandatory**   Rule**        Message**     Data**     
  ------- ---------- ------------ --------------- ---------- ------------- ------------- ------------- ---------- ----------
  1       Balance    System       Screen/View     n/a        Yes           Container for n/a           n/a        Balance
          Enquiry                                                          the balance                            Enquiry
          Screen                                                           display. Must                          
                                                                           be rendered                            
                                                                           in the Light                           
                                                                           Theme.                                 

  2       Savings    Core Banking Decimal         TBD        Yes           Must be a     Service       10500.00   Balance
          Account    Service                                               numerical     Unavailable              Enquiry
          Balance                                                          value.        Error (M-01),            
                                                                           Displayed     Data                     
                                                                           with currency Retrieval                
                                                                           symbol, comma Error (M-02)             
                                                                           separators,                            
                                                                           and two                                
                                                                           decimal                                
                                                                           places.                                

  3       Light      System       Configuration   n/a        Yes           The set of    n/a           n/a        Balance
          Theme                                                            visual styles                          Enquiry
                                                                           (colors,                               
                                                                           fonts) to be                           
                                                                           applied to                             
                                                                           the screen.                            
  --------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     04       Service       We could not retrieve your account     OK
                    Unavailable   balance at this time. Please try again 
                                  later.                                 

  M-02     05       Balance       There was a problem retrieving your    OK
                    Unavailable   account details. Please contact        
                                  support if the issue persists.         
  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to view their
                                                                own account information.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User navigates to the Balance       The system initiates a secure call
  Enquiry screen.                     to the Core Banking Service. The
                                      service returns the balance
                                      successfully. The system displays
                                      the Savings Account Balance as
                                      \"\$10,500.00\" on the Balance
                                      Enquiry Screen within 1.5 seconds.

  Exception: User navigates to the    The system displays the Service
  Balance Enquiry screen, but the     Unavailable Error message (M-01) on
  Core Banking Service is             the Balance Enquiry Screen.
  unreachable.                        
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN the screen successfully retrieves data from the Core
    Banking Service THEN my Savings Account Balance is displayed,
    formatted as currency (e.g., \$10,500.00).

2.  GIVEN I navigate to the Balance Enquiry Screen WHEN the screen
    initiates the data fetch THEN the Savings Account Balance must be
    retrieved and displayed in under 1.5 seconds.

3.  GIVEN the Savings Account Balance is displayed on the Balance
    Enquiry Screen WHEN the screen is inspected with an accessibility
    tool THEN the balance text must meet WCAG 2.1 AA contrast ratio
    requirements for the Light Theme.

4.  GIVEN I am on the Balance Enquiry Screen WHEN the system fails to
    connect to the Core Banking Service to retrieve the balance THEN the
    Service Unavailable Error message (M-01) is displayed in place of
    the balance amount.

5.  GIVEN I am on the Balance Enquiry Screen WHEN the Core Banking
    Service returns an error or invalid data for my account THEN the
    Data Retrieval Error message (M-02) is displayed in place of the
    balance amount.

# E3-S2 --- Access Cash Services from Balance Enquiry Screen

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to use the \"Withdraw\" and \"Deposit\"
action controls on the Balance Enquiry screen, so that I can quickly
navigate to the respective screens to initiate cash transactions. The
navigation must be performant, and the destination screens must be
rendered in their specified themes (light for withdrawal, dark for
deposit).

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Balance Enquiry  Modify          Add navigation logic to the
               Screen                           \"Withdraw\" and \"Deposit\" action
                                                controls.

  2            Application      Modify          Configure the routing paths from the
               Navigation                       Balance Enquiry screen to the ATM Cash
                                                Withdrawal and Cash Deposit screens.

  3            ATM Cash         Integrate       This screen is the destination for the
               Withdrawal                       \"Withdraw\" navigation action.
               Screen                           

  4            Cash Deposit     Integrate       This screen is the destination for the
               Screen                           \"Deposit\" navigation action.

                                                

  Sl. No.      Name             Source          Data Type

  1            Balance Enquiry  System          Screen/View
               Screen                           

  2            Withdraw Action  User Input      Button/Control

  3            Deposit Action   User Input      Button/Control

  4            ATM Cash         System          Screen/View
               Withdrawal                       
               Screen                           

  5            Cash Deposit     System          Screen/View
               Screen                           

  6            Light Theme      System          Configuration

  7            Dark Theme       System          Configuration

                                                

  ID           AC               Subject         Content

  M-01         07               Navigation      We\'re sorry, we couldn\'t load that
                                Error           screen right now. Please try again.

                                                

  User         System                           

  User is on   The system                       
  the Balance  displays the                     
  Enquiry      screen with                      
  Screen.      \"Withdraw\" and                 
               \"Deposit\"                      
               action controls.                 

  User taps    The system                       
  the Withdraw navigates the                    
  Action       user to the ATM                  
  control.     Cash Withdrawal                  
               Screen, rendered                 
               in the Light                     
               Theme, within 2                  
               seconds.                         

  User         The system                       
  navigates    navigates the                    
  back to the  user to the Cash                 
  Balance      Deposit Screen,                  
  Enquiry      rendered in the                  
  Screen and   Dark Theme,                      
  taps the     within 2                         
  Deposit      seconds.                         
  Action                                        
  control.                                      

  Exception:   The system                       
  User taps    displays the                     
  the Withdraw Navigation Error                 
  Action       message (M-01),                  
  control, but and the user                     
  a service    remains on the                   
  error        Balance Enquiry                  
  occurs.      Screen.                          

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ----------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**     **Source**   **Data Type**    **Field    **Is          **Business     **Error     **Test   **Page**
  No.**                                              Length**   Mandatory**   Rule**         Message**   Data**   
  ------- ------------ ------------ ---------------- ---------- ------------- -------------- ----------- -------- ------------
  1       Balance      System       Screen/View      n/a        Yes           Container for  n/a         n/a      Balance
          Enquiry                                                             the action                          Enquiry
          Screen                                                              controls. Must                      
                                                                              be rendered in                      
                                                                              the Light                           
                                                                              Theme.                              

  2       Withdraw     User Input   Button/Control   n/a        Yes           Tapping this   n/a         n/a      Balance
          Action                                                              control                             Enquiry
                                                                              initiates                           
                                                                              navigation to                       
                                                                              the ATM Cash                        
                                                                              Withdrawal                          
                                                                              Screen.                             

  3       Deposit      User Input   Button/Control   n/a        Yes           Tapping this   n/a         n/a      Balance
          Action                                                              control                             Enquiry
                                                                              initiates                           
                                                                              navigation to                       
                                                                              the Cash                            
                                                                              Deposit                             
                                                                              Screen.                             

  4       ATM Cash     System       Screen/View      n/a        Yes           Destination    n/a         n/a      ATM Cash
          Withdrawal                                                          screen for the                      Withdrawal
          Screen                                                              \"Withdraw\"                        
                                                                              action. Must                        
                                                                              be rendered in                      
                                                                              the Light                           
                                                                              Theme.                              

  5       Cash Deposit System       Screen/View      n/a        Yes           Destination    n/a         n/a      Cash Deposit
          Screen                                                              screen for the                      
                                                                              \"Deposit\"                         
                                                                              action. Must                        
                                                                              be rendered in                      
                                                                              the Dark                            
                                                                              Theme.                              

  6       Light Theme  System       Configuration    n/a        Yes           The set of     n/a         n/a      ATM Cash
                                                                              visual styles                       Withdrawal
                                                                              (colors,                            
                                                                              fonts) to be                        
                                                                              applied to the                      
                                                                              ATM Cash                            
                                                                              Withdrawal                          
                                                                              Screen.                             

  7       Dark Theme   System       Configuration    n/a        Yes           The set of     n/a         n/a      Cash Deposit
                                                                              visual styles                       
                                                                              (colors,                            
                                                                              fonts) to be                        
                                                                              applied to the                      
                                                                              Cash Deposit                        
                                                                              Screen.                             
  ----------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     07       Navigation    We\'re sorry, we couldn\'t load that   OK
                    Error         screen right now. Please try again.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to view their
                                                                account information and
                                                                access transaction
                                                                screens.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Balance Enquiry      The system displays the screen with
  Screen.                             \"Withdraw\" and \"Deposit\" action
                                      controls.

  User taps the Withdraw Action       The system navigates the user to
  control.                            the ATM Cash Withdrawal Screen,
                                      rendered in the Light Theme, within
                                      2 seconds.

  User navigates back to the Balance  The system navigates the user to
  Enquiry Screen and taps the Deposit the Cash Deposit Screen, rendered
  Action control.                     in the Dark Theme, within 2
                                      seconds.

  Exception: User taps the Withdraw   The system displays the Navigation
  Action control, but a service error Error message (M-01), and the user
  occurs.                             remains on the Balance Enquiry
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

6.  GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN I tap the Withdraw Action control THEN I am navigated to
    the ATM Cash Withdrawal Screen.

7.  GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN I tap the Deposit Action control THEN I am navigated to
    the Cash Deposit Screen.

8.  GIVEN I have successfully navigated to the ATM Cash Withdrawal
    Screen WHEN the screen is rendered THEN it is displayed using the
    application\'s defined Light Theme.

9.  GIVEN I have successfully navigated to the Cash Deposit Screen WHEN
    the screen is rendered THEN it is displayed using the application\'s
    defined Dark Theme.

10. GIVEN I tap either the Withdraw Action or Deposit Action control
    WHEN the system navigates to the destination screen THEN the screen
    must finish loading and be interactive in under 2 seconds.

11. GIVEN the Withdraw Action and Deposit Action controls are displayed
    on the Balance Enquiry Screen WHEN the screen is inspected with an
    accessibility tool THEN the controls must meet WCAG 2.1 AA
    requirements for touch target size.

12. GIVEN I am on the Balance Enquiry Screen WHEN I tap an action
    control and the navigation service fails THEN the Navigation Error
    message (M-01) is displayed, and I remain on the Balance Enquiry
    Screen.

# View Personalized Financial Tips on the Balance Enquiry Screen

**Epic:** AI-Powered User Experience Enhancements

**Description**

As a Bank Customer, I want to view a personalized financial tip in the
\"Helpful Tips\" section when I access the Balance Enquiry screen, so
that I can receive contextual guidance to improve my financial wellness.
This feature integrates the on-device Personalized AI Nudge Engine to
provide relevant advice, with a graceful fallback to a default tip if a
personalized one cannot be generated, ensuring a reliable and
value-added experience.

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Balance Enquiry  Modify          Integrate logic to call the
               Screen                           Personalized AI Nudge Engine and
                                                display the returned tip in the
                                                Helpful Tips Section.

  2            Personalized AI  Integrate       The Balance Enquiry Screen will
               Nudge Engine                     consume the output of this on-device
                                                module to retrieve financial tips.

                                                

  Sl. No.      Name             Source          Data Type

  1            Helpful Tips     System          UI Container
               Section                          

  2            Personalized     Personalized AI String
               Financial Tip    Nudge Engine    

  3            Default          Personalized AI String
               Financial Tip    Nudge Engine    

  4            Balance Enquiry  System          Screen/View
               Screen                           

                                                

  ID           AC               Subject         Content

  M-01         05               Tips            Financial tips are currently
                                Unavailable     unavailable. Please check back later.

                                                

  User         System                           

  User         The system calls                 
  navigates to the Personalized                 
  the Balance  AI Nudge Engine.                 
  Enquiry      The engine                       
  Screen.      successfully                     
               generates a                      
               Personalized                     
               Financial Tip.                   
               The screen loads                 
               in under 1.5                     
               seconds, with                    
               the tip                          
               generation                       
               adding less than                 
               200ms. The                       
               Helpful Tips                     
               Section displays                 
               the Personalized                 
               Financial Tip.                   

  Exception:   The system calls                 
  User         the Personalized                 
  navigates to AI Nudge Engine,                 
  the Balance  but it is unable                 
  Enquiry      to generate a                    
  Screen.      personalized                     
               tip. The engine                  
               returns a                        
               Default                          
               Financial Tip.                   
               The Helpful Tips                 
               Section displays                 
               the Default                      
               Financial Tip.                   

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**       **Source**     **Data Type** **Field    **Is          **Business      **Error     **Test Data** **Page**
  No.**                                               Length**   Mandatory**   Rule**          Message**                 
  ------- -------------- -------------- ------------- ---------- ------------- --------------- ----------- ------------- ----------
  1       Helpful Tips   System         UI Container  n/a        Yes           A designated    n/a         n/a           Balance
          Section                                                              area on the                               Enquiry
                                                                               screen to                                 
                                                                               display a                                 
                                                                               financial tip.                            

  2       Personalized   Personalized   String        TBD        Yes           A context-aware n/a         \"Consider    Balance
          Financial Tip  AI Nudge                                              tip generated               setting up a  Enquiry
                         Engine                                                by the engine.              recurring     
                                                                               Displayed on                transfer to   
                                                                               success.                    your savings  
                                                                                                           account.\"    

  3       Default        Personalized   String        TBD        Yes           A generic tip   n/a         \"Did you     Balance
          Financial Tip  AI Nudge                                              used as a                   know you can  Enquiry
                         Engine                                                fallback when a             transfer      
                                                                               personalized                funds between 
                                                                               tip cannot be               your          
                                                                               generated.                  accounts?\"   

  4       Balance        System         Screen/View   n/a        Yes           The screen      n/a         n/a           Balance
          Enquiry Screen                                                       containing the                            Enquiry
                                                                               user\'s balance                           
                                                                               and the Helpful                           
                                                                               Tips Section.                             
                                                                               Must be                                   
                                                                               rendered in the                           
                                                                               light theme.                              
  ---------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Tips          Financial tips are currently           OK
                    Unavailable   unavailable. Please check back later.  

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to view their
                                                                account balance and
                                                                related content.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User navigates to the Balance       The system calls the Personalized
  Enquiry Screen.                     AI Nudge Engine. The engine
                                      successfully generates a
                                      Personalized Financial Tip. The
                                      screen loads in under 1.5 seconds,
                                      with the tip generation adding less
                                      than 200ms. The Helpful Tips
                                      Section displays the Personalized
                                      Financial Tip.

  Exception: User navigates to the    The system calls the Personalized
  Balance Enquiry Screen.             AI Nudge Engine, but it is unable
                                      to generate a personalized tip. The
                                      engine returns a Default Financial
                                      Tip. The Helpful Tips Section
                                      displays the Default Financial Tip.
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN I am on the Balance Enquiry Screen WHEN the screen loads and
    the Personalized AI Nudge Engine successfully generates a contextual
    tip THEN the Helpful Tips Section displays the Personalized
    Financial Tip.

2.  GIVEN I am on the Balance Enquiry Screen WHEN the screen loads but
    the Personalized AI Nudge Engine is unable to generate a contextual
    tip THEN the Helpful Tips Section displays the Default Financial Tip
    as a fallback.

3.  GIVEN the Personalized AI Nudge Engine is called to generate a tip
    WHEN the Balance Enquiry Screen is rendering THEN the process of
    fetching and displaying the tip must not add more than 200ms to the
    total screen load time.

4.  GIVEN a Personalized Financial Tip or Default Financial Tip is
    displayed WHEN the Balance Enquiry Screen is inspected with an
    accessibility tool THEN the tip text must meet WCAG 2.1 AA contrast
    and readability standards against the light theme background.

5.  GIVEN I am on the Balance Enquiry Screen WHEN the Personalized AI
    Nudge Engine service is completely unavailable and cannot provide a
    default tip THEN the Helpful Tips Section displays the error message
    (M-01).
