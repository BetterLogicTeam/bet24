
1. Free Registration ----(Sp_register_temp)
https://carbon.nakshtech.info/registration
Api Type: Post
Body Request:
{
	"sid":224466,
    "accountnumber":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "position":"1"
}


2. Login----
https://carbon.nakshtech.info/login?id=224466
Api Type: Get


3. Dashboard Details----(betawallet_new_mvc)
https://carbon.nakshtech.info/DashboardDetails?uid=224466
Api Type: Get

4. Roi Income ----(sp_roiincomereport)
https://carbon.nakshtech.info/roiIncome
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

5. Binary Income ----(sp_binaryincomeReport)
https://carbon.nakshtech.info/binaryIncome
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

6. Direct Income ----(sp_directincomereport)
https://carbon.nakshtech.info/directIncome
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

7. Level Income ----(sp_levelincomereport)
https://carbon.nakshtech.info/levelIncome
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

8. My Team ----(pro_downline)
https://carbon.nakshtech.info/myTeam
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":"",
    "position":0,
    "status":2
}

9. My Direct ----(pro_direct)
https://carbon.nakshtech.info/myDirect
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":"",
    "position":0,
    "status":2
}

10. Level Details ----(pro_leveldetails)
https://carbon.nakshtech.info/levelDetails
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":"",
    "level":0,
    "status":2
}

11. Activation/Upgrade History ----(sp_activationHistory)
https://carbon.nakshtech.info/activationHistory
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

12. Baby doge coin booster ----(sp_dogecoinbooster)
https://carbon.nakshtech.info/dogeCoinBooster
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":""
}

13. BUSD Activation ----(Activate_package_temp)
https://carbon.nakshtech.info/busdActivation
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "busdValue":100
}


14. Token Activation ----(Activate_package_temp_token)
https://carbon.nakshtech.info/tokenActivation
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "tokenValue":100
}


15. BNB Activation ----(Activate_package_temp_bnb)
https://carbon.nakshtech.info/bnbActivation
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "bnbValue":100
}


16. BUSD Upgrade ----(Upgrade_package_temp)
https://carbon.nakshtech.info/busdUpgrade
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "busdValue":100
}


17. Token Upgrade ----(Upgrade_package_temp_token)
https://carbon.nakshtech.info/tokenUpgrade
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "tokenValue":100
}


18. BNB Upgrade ----(Upgrade_package_temp_bnb)
https://carbon.nakshtech.info/bnbUpgrade
Api Type: Post
Body Request:
{
	"uid":741851,
    "amount":100,
    "traxn":"hfghfh64grt6546ytryrtyrrtyrty54",
    "walletAddress":"TYQB3N4fBKRiqxfmVEK2LzBAzkEsEfW4uk",
    "bnbValue":100
}

19. Wallet Details----(sp_walletDetails)
https://carbon.nakshtech.info/walletDetails?uid=224466
Api Type: Get

20. Staking ----(Pro_Topup_staking)
https://carbon.nakshtech.info/staking
Api Type: Post
Body Request:
{
	"uid":224466,
    "token":0,
    "days":45
}
Note :- days: 45,90,180 

21. Staking History----(sp_stakingactivationhistory)
https://carbon.nakshtech.info/stakingHistory
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":""
}

22. Roi Withdrawal----(Sp_InsertBinaryData_ROI)
https://carbon.nakshtech.info/roiWithdrawal
Api Type: Post
Body Request:
{
	"uid":224466,
    "amount":10,
    "token":10
}

23. Working Withdrawal----(Sp_InsertBinaryData_ROI_Working)
https://carbon.nakshtech.info/workingWithdrawal
Api Type: Post
Body Request:
{
	"uid":224466,
    "amount":10,
    "token":10
}

24. Trading Withdrawal History----(sp_roiWithdrawalhistory)
https://carbon.nakshtech.info/roiWithdrawalHistory
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":""
}


25. Working Withdrawal History----(sp_workingWithdrawalhistory)
https://carbon.nakshtech.info/workingWithdrawalHistory
Api Type: Post
Body Request:
{
	"uid":224466,
    "fromDate":"",
    "toDate":""
}

26. Convert usd to bnb----(fn_Calculated_Value_BNB_Withdrawal)
https://carbon.nakshtech.info/convertUsdToBnb?amount=1
Api Type: Get

27. Convert usd to busd----(fn_Calculated_Value_Withdrawal)
https://carbon.nakshtech.info/convertUsdToBusd?amount=1
Api Type: Get


28. Month growth booster----(sp_month_growth_booster)
https://carbon.nakshtech.info/monthGrowthBooster
Api Type: Post
Body Request:
{
	"uid":0,
    "fromDate":"",
    "toDate":""
}

29. Binary Tree----(Sp_get_binarytree_new_hoverdetail)
https://carbon.nakshtech.info/MatchingTree
Api Type: Post
Body Request:
{
	"uid":224467
}


30. admin login check status --> Sp_admin_login_check
https://carbon.nakshtech.info/Adminloginstatus		
Api Type: Post	
Body Request:
{
	"uid":"doradoadmin",
	"password":"568U3Rq!$b6h",
	"result": ""
}

31. adminlogin -->sp_admin_login_withotp1_check_mvc
https://carbon.nakshtech.info/adminlogin	
Api Type: Post	
Body Request:			
{
 "uid":"doradoadmin",
  "password":"568U3Rq!$b6h",
  "otp": "404240",
  "ipaddress":"",
  "remark" : "",
  "sessionid":0,
  "secretkey" : "",
  "result" : ""
}

32. admin dashboard
https://carbon.nakshtech.info/admindashboard
Api Type: Get


33. AllMembers-->GetCustomers_Pager
https://carbon.nakshtech.info/AllMembers 	
Api Type: Post					
{
 "uid":"",
  "fromDate": "",
  "toDate": "",
  "topup": 2
}

34. Id block/Unblock-->sp_change_status
https://carbon.nakshtech.info/Changestatus	
Api Type: Post					
{
 "uid":"",
  "status": 2
}

35. Get Power Leg  Business--sp_getpowerlegBusiness
https://carbon.nakshtech.info/getPowerLegBusiness
Api Type: Get					

36. Add Power Leg --pro_powerleg
https://carbon.nakshtech.info/addPowerLeg
Api Type: post	
{
 "uid":"224466",
  "business": 2,
  "position": 1			--1 for Left 2 for Right
}

37. Id Activation Zero Pin --Pro_topupdetailsadmin_zeropin
https://carbon.nakshtech.info/topupdetails_admin
Api Type: post	
{
 "uid":"000000",
  "referby": "Admin",
  "amount": 0	,
  "amounttoken":0,
  "trxvalue": 0
   
}				

38. Mnmber History / admin/user--sp_getMEMBER_REWARD
https://carbon.nakshtech.info/Get_MEMBER_REWARD
Api Type: Get	
{
 "uid":"224466"

}
