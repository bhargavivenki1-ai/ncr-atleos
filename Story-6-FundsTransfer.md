# Execute a Successful Fund Transfer

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to select my \'From\' and \'To\' accounts,
enter a valid amount, and submit the request on the Transfer Funds
screen, so that I can securely move money between my accounts and
receive a confirmation.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**    **Action**      **Explanation**
  -------------- ---------------- --------------- --------------------------------------
  1              Transfer Funds   Modify          Implement the submission logic for the
                 Screen                           Submit Button, including data
                                                  validation, service integration, and
                                                  response handling.

  2              Core Banking     Integrate       Send an encrypted API request to the
                 Service                          service to execute the atomic fund
                                                  transfer transaction.

  3              Application      Modify          Configure the routing path from the
                 Navigation                       Transfer Funds Screen to the TBD:
                                                  Transfer Confirmation Screen upon
                                                  successful transfer.

                                                  

  Sl. No.        Name             Source          Data Type

  1              From Account     User Input      Dropdown/Selector
                 Selector                         

  2              To Account       User Input      Dropdown/Selector
                 Selector                         

  3              Amount           User Input      Decimal

  4              Submit Button    User Input      Button

  5              Transfer         Core Banking    JSON Object
                 Response         Service         

                                                  

  ID             AC               Subject         Content

  M-01           04               Transfer Failed We were unable to process your
                                                  transfer at this time. No funds have
                                                  been moved. Please try again later.

                                                  

  User           System                           

  User is on the System displays                  
  Transfer Funds selectors for                    
  Screen.        From Account and                 
                 To Account, an                   
                 Amount field,                    
                 and a Submit                     
                 Button.                          

  User selects   The field is                     
  \"Savings\"    populated with                   
  from the From  \"Savings\".                     
  Account                                         
  Selector.                                       

  User selects   The field is                     
  \"Checking\"   populated with                   
  from the To    \"Checking\".                    
  Account                                         
  Selector.                                       

  User enters    The field                        
  \"100.00\"     displays                         
  into the       \"100.00\".                      
  Amount field.                                   

  User taps the  System sends a                   
  Submit Button. secure request                   
                 to the Core                      
                 Banking Service                  
                 and, within 3                    
                 seconds,                         
                 navigates the                    
                 user to the TBD:                 
                 Transfer                         
                 Confirmation                     
                 Screen.                          

  Exception:     The system                       
  User submits a displays the                     
  valid request, Transfer Failed                  
  but the Core   error message                    
  Banking        (M-01). The user                 
  Service is     remains on the                   
  down.          Transfer Funds                   
                 Screen.                          

                                                  

  Number         User             IDM             User Role
                 Classification   Authorization   

  1              Customer         Authenticated   Bank Customer
                                  Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  --------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**       **Field    **Is          **Business    **Error     **Test Data**        **Page**
  No.**                                               Length**   Mandatory**   Rule**        Message**                        
  ------- ---------- ------------ ------------------- ---------- ------------- ------------- ----------- -------------------- ----------
  1       From       User Input   Dropdown/Selector   n/a        Yes           Must be       Select a    Savings              Transfer
          Account                                                              selected      \'From\'                         Funds
          Selector                                                             before        account.                         
                                                                               submission.                                    
                                                                               Cannot be the                                  
                                                                               same as the                                    
                                                                               To Account.                                    

  2       To Account User Input   Dropdown/Selector   n/a        Yes           Must be       Select a    Checking             Transfer
          Selector                                                             selected      \'To\'                           Funds
                                                                               before        account.                         
                                                                               submission.                                    
                                                                               Cannot be the                                  
                                                                               same as the                                    
                                                                               From Account.                                  

  3       Amount     User Input   Decimal             TBD        Yes           Must be a     Enter a     100.00               Transfer
                                                                               positive      valid                            Funds
                                                                               number        amount.                          
                                                                               greater than                                   
                                                                               zero and less                                  
                                                                               than or equal                                  
                                                                               to the From                                    
                                                                               Account                                        
                                                                               balance.                                       

  4       Submit     User Input   Button              n/a        Yes           Initiates the n/a         n/a                  Transfer
          Button                                                               fund transfer                                  Funds
                                                                               request to                                     
                                                                               the Core                                       
                                                                               Banking                                        
                                                                               Service.                                       

  5       Transfer   Core Banking JSON Object         n/a        Yes           The success   n/a         {\"status\":         n/a
          Response   Service                                                   or failure                \"success\",         
                                                                               response from             \"transactionId\":   
                                                                               the backend.              \"TXN12345\"}        
                                                                               Must be                                        
                                                                               received in                                    
                                                                               under 3                                        
                                                                               seconds.                                       
  --------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     04       Transfer      We were unable to process your         OK
                    Failed        transfer at this time. No funds have   
                                  been moved. Please try again later.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to access and
                                                                transact with their own
                                                                accounts.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Transfer Funds       System displays selectors for From
  Screen.                             Account and To Account, an Amount
                                      field, and a Submit Button.

  User selects \"Savings\" from the   The field is populated with
  From Account Selector.              \"Savings\".

  User selects \"Checking\" from the  The field is populated with
  To Account Selector.                \"Checking\".

  User enters \"100.00\" into the     The field displays \"100.00\".
  Amount field.                       

  User taps the Submit Button.        System sends a secure request to
                                      the Core Banking Service and,
                                      within 3 seconds, navigates the
                                      user to the TBD: Transfer
                                      Confirmation Screen.

  Exception: User submits a valid     The system displays the Transfer
  request, but the Core Banking       Failed error message (M-01). The
  Service is down.                    user remains on the Transfer Funds
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN I am on the Transfer Funds Screen and have selected a valid
    From Account and To Account and entered a valid Amount WHEN I tap
    the Submit Button THEN a secure request is sent to the Core Banking
    Service to execute the transfer, and upon success, I am navigated to
    the TBD: Transfer Confirmation Screen.

2.  GIVEN I have tapped the Submit Button with valid data WHEN the
    system processes the fund transfer THEN a confirmation response must
    be received from the Core Banking Service and the UI updated in
    under 3 seconds.

3.  GIVEN a fund transfer request is initiated WHEN the request
    containing account and amount details is sent to the Core Banking
    Service THEN the communication must occur over a secure, encrypted
    channel.

4.  GIVEN I have submitted a valid transfer request WHEN the Core
    Banking Service is unavailable or returns a generic processing error
    THEN the Transfer Failed error message (M-01) is displayed, and I
    remain on the Transfer Funds Screen.

5.  GIVEN the From Account Selector, To Account Selector, Amount input
    field, and Submit Button are displayed on the Transfer Funds Screen
    WHEN the screen is inspected with an accessibility tool THEN all
    interactive elements must meet WCAG 2.1 AA standards for the Dark
    Theme, including appropriate labels, contrast ratios, and minimum
    touch target sizes.

# E3-S4 --- Receive Validation for Fund Transfer Inputs

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to receive clear error messages if I try to
submit a transfer without selecting accounts, entering an amount, or if
I have insufficient funds, so that I can correct my inputs before a
transaction is processed.

**Impacted Areas**

  ----------------------------------------------------------------------------------------
  **No.**          **Page Name**    **Action**      **Explanation**
  ---------------- ---------------- --------------- --------------------------------------
  1                Transfer Funds   Modify          Implement client-side validation logic
                   Screen                           for account selectors and the amount
                                                    field. Implement handling for
                                                    server-side error responses.

  2                Core Banking     Integrate       Handle the specific error response
                   Service                          code/message for \"Insufficient
                                                    Funds\" when a transfer request is
                                                    rejected for this reason.

                                                    

  Sl. No.          Name             Source          Data Type

  1                From Account     User Input      Dropdown
                   Selector                         

  2                To Account       User Input      Dropdown
                   Selector                         

  3                Amount           User Input      Decimal

  4                Submit Button    User Input      Button

  5                From Account     Core Banking    Decimal
                   Balance          Service         

                                                    

  ID               AC               Subject         Content

  M-01             01               \'From\'        Please select an account to transfer
                                    Account         funds from.
                                    Required        

  M-02             02               \'To\' Account  Please select an account to transfer
                                    Required        funds to.

  M-03             03               Invalid Account The \'From\' and \'To\' accounts
                                    Selection       cannot be the same.

  M-04             04               Amount Required Please enter an amount to transfer.

  M-05             05               Invalid Amount  Please enter an amount greater than
                                                    zero.

  M-06             06               Insufficient    The amount exceeds the available
                                    Funds           balance in your selected account.

                                                    

  User             System                           

  User is on the   System displays                  
  Transfer Funds   From Account                     
  Screen.          Selector, To                     
                   Account                          
                   Selector, Amount                 
                   field, and                       
                   Submit Button.                   

  User selects     The fields are                   
  \"Savings\" from populated.                       
  From Account                                      
  Selector and                                      
  \"Checking\"                                      
  from To Account                                   
  Selector.                                         

  User leaves the  System displays                  
  Amount field     the \"Amount                     
  blank and taps   Required\" error                 
  the Submit       message (M-04).                  
  Button.          The user remains                 
                   on the Transfer                  
                   Funds Screen.                    

  Exception: User  The user taps                    
  enters an Amount the Submit                       
  of \"12000.00\", Button.                          
  which is greater                                  
  than the From                                     
  Account Balance                                   
  of \"10500.00\".                                  

  System sends the                                  
  request,                                          
  receives an                                       
  error from the                                    
  Core Banking                                      
  Service, and                                      
  displays the                                      
  \"Insufficient                                    
  Funds\" error                                     
  message (M-06).                                   

                                                    

  Number           User             IDM             User Role
                   Classification   Authorization   

  1                Customer         Authenticated   Bank Customer
                                    Session         
  ----------------------------------------------------------------------------------------

**Data Dictionary**

  ------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data     **Field    **Is          **Business   **Error     **Test     **Page**
  No.**                           Type**     Length**   Mandatory**   Rule**       Message**   Data**     
  ------- ---------- ------------ ---------- ---------- ------------- ------------ ----------- ---------- ----------
  1       From       User Input   Dropdown   n/a        Yes           Must be      Please      Savings    Transfer
          Account                                                     selected.    select an              Funds
          Selector                                                    Cannot be    account to             
                                                                      the same as  transfer               
                                                                      To Account   funds from.            
                                                                      Selector.                           

  2       To Account User Input   Dropdown   n/a        Yes           Must be      Please      Checking   Transfer
          Selector                                                    selected.    select an              Funds
                                                                      Cannot be    account to             
                                                                      the same as  transfer               
                                                                      From Account funds to.              
                                                                      Selector.                           

  3       Amount     User Input   Decimal    TBD        Yes           Must be a    Please      50.00      Transfer
                                                                      positive     enter an               Funds
                                                                      number       amount                 
                                                                      greater than greater                
                                                                      zero. Must   than zero.             
                                                                      not exceed                          
                                                                      From Account                        
                                                                      Balance.                            

  4       Submit     User Input   Button     n/a        Yes           Triggers     n/a         n/a        Transfer
          Button                                                      validation                          Funds
                                                                      and                                 
                                                                      submission                          
                                                                      of the                              
                                                                      transfer                            
                                                                      request.                            

  5       From       Core Banking Decimal    TBD        Yes           Used to      The amount  10500.00   Transfer
          Account    Service                                          validate     exceeds the            Funds
          Balance                                                     against the  available              
                                                                      entered      balance in             
                                                                      Amount.      your                   
                                                                                   selected               
                                                                                   account.               
  ------------------------------------------------------------------------------------------------------------------

**System Messages**

  ------------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**    **Content**                            **Button**
  -------- -------- -------------- -------------------------------------- ------------
  M-01     01       \'From\'       Please select an account to transfer   OK
                    Account        funds from.                            
                    Required                                              

  M-02     02       \'To\' Account Please select an account to transfer   OK
                    Required       funds to.                              

  M-03     03       Invalid        The \'From\' and \'To\' accounts       OK
                    Account        cannot be the same.                    
                    Selection                                             

  M-04     04       Amount         Please enter an amount to transfer.    OK
                    Required                                              

  M-05     05       Invalid Amount Please enter an amount greater than    OK
                                   zero.                                  

  M-06     06       Insufficient   The amount exceeds the available       OK
                    Funds          balance in your selected account.      
  ------------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to access and
                                                                transact with their own
                                                                accounts.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Transfer Funds       System displays From Account
  Screen.                             Selector, To Account Selector,
                                      Amount field, and Submit Button.

  User selects \"Savings\" from From  The fields are populated.
  Account Selector and \"Checking\"   
  from To Account Selector.           

  User leaves the Amount field blank  System displays the \"Amount
  and taps the Submit Button.         Required\" error message (M-04).
                                      The user remains on the Transfer
                                      Funds Screen.

  Exception: User enters an Amount of The user taps the Submit Button.
  \"12000.00\", which is greater than 
  the From Account Balance of         
  \"10500.00\".                       

  System sends the request, receives  
  an error from the Core Banking      
  Service, and displays the           
  \"Insufficient Funds\" error        
  message (M-06).                     
  -----------------------------------------------------------------------

**Acceptance Criteria**

6.  GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without selecting a From Account THEN the error message (M-01) is
    displayed, and no transfer request is initiated.

7.  GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without selecting a To Account THEN the error message (M-02) is
    displayed, and no transfer request is initiated.

8.  GIVEN I am on the Transfer Funds Screen and have selected the same
    account for the From Account Selector and To Account Selector WHEN I
    tap the Submit Button THEN the error message (M-03) is displayed,
    and no transfer request is initiated.

9.  GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without entering a value in the Amount field THEN the error message
    (M-04) is displayed, and no transfer request is initiated.

10. GIVEN I am on the Transfer Funds Screen and have entered an Amount
    of zero or a negative value WHEN I tap the Submit Button THEN the
    error message (M-05) is displayed, and no transfer request is
    initiated.

11. GIVEN I am on the Transfer Funds Screen and have entered an Amount
    that exceeds the available balance of the selected From Account WHEN
    I tap the Submit Button THEN the Core Banking Service returns an
    insufficient funds error, the error message (M-06) is displayed, and
    the transfer is not processed.

12. GIVEN an error message is displayed for an invalid field on the
    Transfer Funds Screen WHEN the screen is inspected with an
    accessibility tool THEN the error message text is programmatically
    associated with its corresponding input field (e.g., via
    aria-describedby) to meet WCAG 2.1 AA standards.
