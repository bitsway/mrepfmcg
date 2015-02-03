

var mobile_off_flag=0;

//-------GET GEO LOCATION
function getLocationInfo() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	
	$("#lat_p").val(position.coords.latitude);
	$("#long_p").val(position.coords.longitude);
	
	$("#lat_complain").val(position.coords.latitude);
	$("#long_complain").val(position.coords.longitude);
	
	$("#checkLocation").html('Location Confirmed');
	$("#checkLocationProfileUpdate").html('Location Confirmed');
	$("#checkLocationComplain").html('Location Confirmed');
	
}

function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	
	$("#lat_complain").val(0);
	$("#long_complain").val(0);
	
	$("#checkLocation").html('Location not found');
	$("#checkLocationProfileUpdate").html('Location not found');
	$("#checkLocationComplain").html('Location not found');
	
	}

// -------------- If Not synced, Show login
function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
}

// -------------- visit page show if mobile off 
function cancelVisitPage(){
	localStorage.visit_page=""
	mobile_off_flag=0;
	
	localStorage.visitMarketStr=""
	localStorage.visit_distributor_nameid=""
	localStorage.visit_type=""
	localStorage.scheduled_date=""
	localStorage.visit_client=""
	
	var url = "#pageHome";
	$.mobile.navigate(url);
}

//================= Clear authorization
function clear_autho(){
	var check_clear=$("input[name='clear_auth_check']:checked").val();
	
	if(check_clear!='Yes'){
		$("#error_login").html("Required Confirm Clear");			
	}else{
		localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';
		
		localStorage.cid='';
		localStorage.user_id='';
		localStorage.user_pass='';
		localStorage.synccode='';
		localStorage.marketListStr='';
		localStorage.productListStr='';
		localStorage.marchandizingItem='';
		localStorage.distributorListStr='';	
		localStorage.synced=''
		
		localStorage.client_string=''	
		localStorage.visit_client=''
		
		localStorage.visit_type=''
		localStorage.scheduled_date=''
		localStorage.visitMarketStr=''
		localStorage.visit_distributor_nameid=''
		localStorage.marchandizingStr=''
		localStorage.clientProfileStr=''
		
		localStorage.product_tbl_str=''
		
		localStorage.product_tbl_del_str=''
		
		localStorage.distributor_name=''
		localStorage.delivery_date=''
		localStorage.dis_client_string=''
		
		localStorage.plan_market=''
		localStorage.plan_date=''
		
		localStorage.m_plan_client_string=''
		localStorage.plan_ret_name=''
		
		localStorage.marketInfoStr=''
		localStorage.marketInfoSubmitStr=''
		localStorage.productOrderStr=''
		localStorage.marchandizingInfoStr=''
		
		localStorage.visit_plan_marketlist_combo=''
		localStorage.visit_plan_client_cmb_list=''
		localStorage.delivery_distributor_cmb_list=''
		localStorage.delivery_retailer_cmb_list=''
		localStorage.market_cmb_list_cp=''
		localStorage.unschedule_market_cmb_id=''
		
		localStorage.profile_m_client_org_id=''
		
		//----------
		localStorage.campaign_string=''	
		localStorage.visit_camp_list_str=''
		localStorage.visit_camp_submit_str=''
		//------
		localStorage.brand_list_string=''
		
		localStorage.visit_page=""
		
		localStorage.rpt_market_combo_string=""
		
		
		//----------- empty brand data from local storage
		var brandList = localStorage.brand_list_string.split('<rd>');
		var brandListLength=brandList.length	
		for (var i=0; i < brandListLength; i++){
			var brandName = brandList[i]
			if(brandName!=""){
				var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
				localStorage[brandCharStr]='';	
			}																					
		}
		
		var url = "#login";
		$.mobile.navigate(url);	
		location.reload();
	};
}

function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}

							
//========================= Longin: Check user
//'SIXSEASONS'
function check_user() {
	
	var cid=$("#cid").val().toUpperCase();
	var user_id=$("#user_id").val().toUpperCase();
	var user_pass=$("#user_pass").val();
	
	
	//-------------- Base Url	
	//syncmobile
	var apipath_base_photo_dm='http://e2.businesssolutionapps.com/dmpath/get_path?CID='+cid +'&HTTPPASS=e99business321cba'
	
	//local
	//var apipath_base_photo_dm='http://127.0.0.1:8000/welcome/dmpath/get_path?CID='+cid +'&HTTPPASS=e99business321cba'
	
	//----------------
	
	var base_url='';
	var photo_url='';
	
	
	//-----
	if (cid=="" || cid==undefined || user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required CID, User ID and Password");	
	}else{
		//-----------------
		localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';
		
		//alert(apipath_base_photo_dm);
		
		//----
		$.ajax({
			 type: 'POST',
			 url: apipath_base_photo_dm,
			 success: function(result) {					
				if (result==''){
					$("#wait_image_login").hide();
					$("#loginButton").show();
					$("#error_login").html('Base URL not available');						
				}else{
					var startIndex=result.indexOf('<start>')
					var endIndex=result.indexOf('<end>')
					
					var urlResult=result.substring(startIndex+7,endIndex);
					
					var resultArray = urlResult.split('<fd>');		
					if(resultArray.length==3){
						base_url=resultArray[0]
						photo_url=resultArray[1]
						photo_submit_url=resultArray[2]
						
						//-------------
						if(base_url=='' || photo_url==''){	
							$("#wait_image_login").hide();
							$("#loginButton").show();
							$("#error_login").html('Base URL not available');	
						}else{
							//--------------------------
							$("#error_login").html("");		
							$("#loginButton").hide();
							$("#wait_image_login").show();
							
							localStorage.base_url=base_url;
							localStorage.photo_url=photo_url;
							localStorage.photo_submit_url=photo_submit_url;
							
							localStorage.cid=cid;
							localStorage.user_id=user_id;
							localStorage.user_pass=user_pass;   		
							localStorage.synced='NO'
							
							//alert(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
							
							$.ajax({
									 type: 'POST',
									 url: localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
									 success: function(result) {
											
											if (result==''){
												$("#wait_image_login").hide();
												$("#loginButton").show();
												$("#error_login").html('Sorry Network not available');
												
											}else{							
												var resultArray = result.split('<SYNCDATA>');			
												if (resultArray[0]=='FAILED'){
													$("#wait_image_login").hide();
													$("#loginButton").show();								
													$("#error_login").html(resultArray[1]);
													
												}else if (resultArray[0]=='SUCCESS'){
													
													localStorage.synccode=resultArray[1];
													localStorage.marketListStr=resultArray[2];
													localStorage.productListStr=resultArray[3];
													localStorage.marchandizingItem=resultArray[4];
													localStorage.distributorListStr=resultArray[5];								
													localStorage.brand_list_string=resultArray[6];
													
													localStorage.complain_type_string=resultArray[7];
													localStorage.complain_from_string=resultArray[8];
													localStorage.task_type_string=resultArray[9];
													fieldforce_string=resultArray[10];
													
													var productList=localStorage.productListStr.split('<rd>');
													var productLength=productList.length;
													
													//------------ Order Item list								
													var product_tbl_order='<table border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
													for (var j=0; j < productLength; j++){
														var productArray2 = productList[j].split('<fd>');
														var product_id2=productArray2[0];	
														var product_name2=productArray2[1];
														
														var product_qty='';																		
														product_tbl_order+='<tr  style="border-bottom:1px solid #D2EEE9;"><td width="40%" style="text-align:center; padding-left:5px;"><input type="number" id="order_qty'+product_id2+'" value="'+product_qty+'" placeholder="0" ><input type="hidden" id="order_id'+product_id2+'" value="'+product_id2+'" placeholder="qty" ><input type="hidden" id="order_name'+product_id2+'" value="'+product_name2+'" placeholder="qty" ></td><td width="60%" style="text-align:left;">&nbsp;&nbsp;'+product_name2+'</td></tr>';
													}
													product_tbl_order+='</table>';								
													localStorage.product_tbl_str=product_tbl_order
													
													//--------- Delivery Item List								
													var product_tbl_delevery='<table border="0" id="delevery_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
													for (var i=0; i < productLength; i++){
														var productArray = productList[i].split('<fd>');
														var product_id=productArray[0];	
														var product_name=productArray[1];
														
														product_tbl_delevery+='<tr  style="border-bottom:1px solid #D2EEE9;"><td width="40%" style="text-align:center; padding-left:5px;"><input type="number" id="delivery_qty'+product_id+'" value="" placeholder="0" ><input type="hidden" id="delivery_id'+product_id+'" value="'+product_id+'" placeholder="qty" ><input type="hidden" id="delivery_name'+product_id+'" value="'+product_name+'" placeholder="qty" ></td><td width="60%" style="text-align:left;">&nbsp;&nbsp;'+product_name+'</td></tr>';
													}
													product_tbl_delevery+='</table>';								
													localStorage.product_tbl_del_str=product_tbl_delevery
													
													//------------- Visit Plan Market List / Client Profile Market List / Unschedule
													var planMarketList = localStorage.marketListStr.split('<rd>');
													var planMarketListShowLength=planMarketList.length	
													
													var visitPlanMarketComb=''								
													var profileMarketComb='';								
													var unscheduleMarketComb='';
													
													var rpt_market_combo='<option value="" >Select Market *</option>'
													for (var k=0; k < planMarketListShowLength; k++){
														var planMarketValueArray = planMarketList[k].split('<fd>');
														planMarketID=planMarketValueArray[0];
														planMarketName=planMarketValueArray[1];
														marketID=planMarketID
														marketName=planMarketName
														var marketNameID=planMarketName+'-'+planMarketID;
														
														if(planMarketID!=''){
															unscheduleMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															//visitPlanMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="visitPlanMarketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															//profileMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextCProfileLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															rpt_market_combo+='<option value="'+planMarketName+'-'+planMarketID+'" >'+planMarketName+'-'+planMarketID+'</option>';
															}
													}
																					
													localStorage.visit_plan_marketlist_combo=visitPlanMarketComb;								
													localStorage.unschedule_market_cmb_id=unscheduleMarketComb
													localStorage.market_cmb_list_cp=profileMarketComb;
													
													localStorage.rpt_market_combo_string=rpt_market_combo
													
													//------------ Delivery Distributor Combo
													var distributor_string=localStorage.distributorListStr;
													var distributorList = distributor_string.split('<rd>');
													var distributorListShowLength=distributorList.length
													
													var deliveryDistributorCombo=''
													
													for (var i=0; i < distributorListShowLength; i++){
														var distributorValueArray = distributorList[i].split('<fd>');
														distributorID=distributorValueArray[0];
														distributorName=distributorValueArray[1];
														var distributorNameID=distributorName+'-'+distributorID;
														if (distributorID!=''){
															deliveryDistributorCombo+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="distributorNextLV(\''+distributorNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+distributorNameID+'</a></li>';
															}		
													}								
													localStorage.delivery_distributor_cmb_list=deliveryDistributorCombo
													
													//-------------
													/*var region_stringList = region_string.split('<rd>');
													var region_stringListLength=region_stringList.length
													
													var region_combo='<option value="0" >Select Zone</option>'
													for (var i=0; i < region_stringListLength; i++){
														var regionListArray = region_stringList[i].split('<fd>');
														var regionID=regionListArray[0];
														var regionName=regionListArray[1].replace('-',' ');
														if (regionID!=''){
															region_combo+='<option value="'+regionName+'-'+regionID+'" >'+regionName+'-'+regionID+'</option>';
														}
													}
													localStorage.rpt_market_combo_string=region_combo*/
													
													//-------------
													var fieldforce_stringList = fieldforce_string.split('<rd>');
													var fieldforce_stringListLength=fieldforce_stringList.length
													
													var fieldforce_combo='<option value="ALL-ALL" >Select Field Force</option>'
													for (var i=0; i < fieldforce_stringListLength; i++){
														var fieldforceListArray = fieldforce_stringList[i].split('<fd>');
														var fieldforceID=fieldforceListArray[0];
														var fieldforceName=fieldforceListArray[1].replace('-',' ');
														if (fieldforceID!=''){
															fieldforce_combo+='<option value="'+fieldforceName+'-'+fieldforceID+'" >'+fieldforceName+'-'+fieldforceID+'</option>';
														}
													}
													localStorage.rpt_fieldforce_combo_string=fieldforce_combo
													
													//---------------
													$("#error_login").html('');
													$("#wait_image_login").hide();
													$("#loginButton").show();
													
													//----------------
													localStorage.visit_page=""
																		
													localStorage.synced='YES';
													var url = "#pageHome";
													$.mobile.navigate(url);								
													location.reload();
													
												}else{
													$("#wait_image_login").hide();
													$("#loginButton").show();
													$("#error_login").html('Server Error');							
													}
											}
										  },
									  error: function(result) {					 
										  $("#wait_image_login").hide();
										  $("#loginButton").show();
										  $("#error_login").html('Invalid Request');
										  
										  var url = "#login";
										  $.mobile.navigate(url);	
									  }
								  });//end ajax
								}//base url check
						
						//-------------		
					}else{
						$("#wait_image_login").hide();
						$("#loginButton").show();
						$("#error_login").html('Settings not available. Enter valid CID');	
					}
					
				}
			  },
			  error: function(result) {			  	   
				  $("#wait_image_login").hide();
				  $("#loginButton").show();
				  $("#error_login").html('Invalid Request to get Base URL');				  	
			  }
		});//end ajax
		
		//alert(base_url+','+photo_url+'2');
		
		
		  }//end else	
	}//function

function getOtherOutlet(){	
	if (mobile_off_flag==1){
		mobile_off_flag=0;
		
		var url = "#pageHome";
		$.mobile.navigate(url);
		
	}else{
		var visit_type=localStorage.visit_type;
		//alert(visit_type);
		if (visit_type=="Scheduled"){
			var url = "#page_scheduled";
			$.mobile.navigate(url);
			
		}else if(visit_type=="Unscheduled"){
			var url = "#page_market_ret";
			$.mobile.navigate(url);
		};
	};
}

//-------------- Schedule Date Page
function getScheduleDate(){
	$("#btn_schedule_date").show();
	$("#wait_image_schedule_date").hide();
	
	var search_date=$("#sch_date").val();
	
	if (search_date=='' || search_date==undefined){		
		var now = new Date();
		var month=now.getUTCMonth()+1;
		
		if (month<10){
			month="0"+month
			}
		var day=now.getUTCDate();
		if (day<10){
			day="0"+day
			}		
		search_date = now.getUTCFullYear()+ "-" + month + "-" + day;
		$("#sch_date").val(search_date);
	}
	
	var url = "#page_scheduled";
	$.mobile.navigate(url);
	}


//------------------------------------------- Schedule Visit: Get retailers
function getSheduledRetailer(){	
	$("#schedule_client_combo_id").val('');
	
	var search_date=$("#sch_date").val();
	
	if (search_date=='' || search_date==undefined){		
		$("#err_retailer_date_next").text("Date Required");
	}else{
		var serch_date = new Date(search_date);	
		if (serch_date=='Invalid Date'){		
			$("#err_retailer_date_next").text("Invalid date");
		}else{
			$("#err_retailer_date_next").text("");
			$("#btn_schedule_date").hide();
			$("#wait_image_schedule_date").show();
	
			//alert(localStorage.base_url+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date);
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getScheduleClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&sch_date=2014-9-14
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date,
				 success: function(result) {
						
						if (result==''){
							$("#err_retailer_date_next").html('Sorry Network not available');
							$("#btn_schedule_date").show();
							$("#wait_image_schedule_date").hide();
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_retailer_date_next").html(resultArray[1]);								
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
							
							}else if (resultArray[0]=='SUCCESS'){
														
								var client_string=resultArray[1];
																
								//----------------
								var clientList = client_string.split('<rd>');
								var clientListShowLength=clientList.length
								
								//var schedule_client_combo='<option value="0" >Select Retailer</option>'
								var schedule_client_combo=''			
								for (var i=0; i < clientListShowLength; i++){
									var clientValueArray = clientList[i].split('<fd>');
									var clientID=clientValueArray[0];
									var clientName=clientValueArray[1];
									if (clientID!=''){
										//schedule_client_combo+='<option value="'+clientName+'-'+clientID+'" >'+clientName+'-'+clientID+'</option>';
										schedule_client_combo+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="sheduledRetailerVisitNextLV(\''+clientName+'-'+clientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+clientName+'-'+clientID+'</a></li>';
									}
								}
																
								var schedule_client_combo_ob=$('#schedule_client_combo_id_lv');
								schedule_client_combo_ob.empty();	
								schedule_client_combo_ob.append(schedule_client_combo);			
																
								//schedule_client_combo_ob[0].selectedIndex = 0;
								
								$(".s_date").html(search_date);
								
								
								//-----------------
								$("#err_retailer_date_next").text("");
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
								
								//-----
								var url = "#page_scheduled_retailer";
								$.mobile.navigate(url);	
								
								//schedule_client_combo_ob.selectmenu("refresh");
								schedule_client_combo_ob.listview("refresh");
								
							}else{						
								$("#err_retailer_date_next").html('Server Error');
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_retailer_date_next").html('Invalid Request');		
					  $("#btn_schedule_date").show();
					  $("#wait_image_schedule_date").hide();	  
				  }
			 });//end ajax
		
		}
	}
}

//------------------------------------------ Schedule Visit: Next button; merchandizing
function sheduledRetailerVisitNextLV(lvalue) {
	$("#schedule_client_combo_id").val(lvalue);
	sheduledRetailerVisitNext();	
	}
	
function sheduledRetailerVisitNext() {
	var search_date=$("#sch_date").val();
	var visit_client=$("#schedule_client_combo_id").val();
	
	var visit_type="Scheduled";
	var scheduled_date=search_date
	
	if(visit_client=='' || visit_client==0){
			$("#err_retailer_next").text("Retailer required");
		}else{
			$("#err_retailer_next").text("");
			$("#btn_schedule_ret").hide();
			$("#wait_image_schedule_ret").show();
			
			visitClientId=visit_client.split('-')[1]
			
			//alert(localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			//http://127.0.0.1:8000/lscmreporting/syncmobile/getClientInfo?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&client_id=R100008
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
				 success: function(result) {
						
						//alert(result);
						if (result==''){
							$("#err_retailer_next").html('Sorry Network not available');
							$("#btn_schedule_ret").show();
							$("#wait_image_schedule_ret").hide();
			
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_retailer_next").html(resultArray[1]);
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();
							}else if (resultArray[0]=='SUCCESS'){
								
								var visitMarketStr=resultArray[1];
								var merItemStr=resultArray[2];
								var lastMarketInfoStr=resultArray[3];
								
								//------------------------- Campaign
								localStorage.campaign_string=resultArray[4];
								localStorage.visit_camp_list_str=resultArray[5];
								
								var visit_distributor_nameid=resultArray[6];
														
								localStorage.visit_camp_submit_str=''
								
								//------
								localStorage.marchandizingStr=merItemStr
								localStorage.marchandizingInfoStr=''
								
								//----------- empty brand data from local storage
								var brandList = localStorage.brand_list_string.split('<rd>');
								var brandListLength=brandList.length	
								for (var i=0; i < brandListLength; i++){
									var brandName = brandList[i]
									
									if(brandName!=""){
										var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStr]='';	
									}																												
								}
								
								//-------------------	
								localStorage.marketInfoStr=lastMarketInfoStr
								localStorage.marketInfoSubmitStr=''
								
								var lastMarketInfoStrList = lastMarketInfoStr.split('<rd>');
								var lastMarketInfoStrListLength=lastMarketInfoStrList.length
								for (var i=0; i < lastMarketInfoStrListLength; i++){
									var brandNameStrDetails = lastMarketInfoStrList[i]
									
									if(brandNameStrDetails!=''){
										var brandNameStrDetailsList=brandNameStrDetails.split('<fd>');
										var brandNameCurrent=brandNameStrDetailsList[0]
										
										var brandCharStrCurrent=brandNameCurrent.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStrCurrent]=brandNameStrDetails;										
									}
								}
								
								//---------------
								$(".market").html(visitMarketStr);
								$(".visit_distributor").html(visit_distributor_nameid);
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								$(".visit_client").html(visit_client);
								
								localStorage.visit_client=visit_client
								localStorage.visit_type=visit_type
								localStorage.scheduled_date=scheduled_date
								localStorage.visitMarketStr=visitMarketStr
								localStorage.visit_distributor_nameid=visit_distributor_nameid
										
								localStorage.visit_page="YES"
								
								//------------------- 							
								$("#err_retailer_next").text("");
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();
			
								var url = "#page_visit";	
								$.mobile.navigate(url);
								
								//location.reload();
								
							}else{						
								$("#err_retailer_next").html('Server Error');	
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();						
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_retailer_next").html('Invalid Request');
					  $("#btn_schedule_ret").show();
					  $("#wait_image_schedule_ret").hide();
				  }
			 });//end ajax			
		}	
 }

//------------------------------Unsheduled visit: market
function addMarketList() {
	//$("#btn_unschedule_market").hide();
	//$("#wait_image_unschedule_market").show();
	$("#unschedule_market_combo_id").val('');
	
	var unschedule_market_combo_list=localStorage.unschedule_market_cmb_id;
	
	//---
	
	/*var unschedule_market_combo_ob=$('#unschedule_market_combo_id');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	unschedule_market_combo_ob[0].selectedIndex = 0;*/
	
	var unschedule_market_combo_ob=$('#unschedule_market_combo_id_lv');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	
	//-------	
	var url = "#page_market";
	$.mobile.navigate(url);
	//unschedule_market_combo_ob.selectmenu("refresh");
	unschedule_market_combo_ob.listview("refresh");
}

//--------------------------------- Unsheduled visit: Client list by market id

function marketNextLV(lvalue) {
	$("#unschedule_market_combo_id").val(lvalue);
	//alert(lvalue);
	marketNext();	
	}

function marketNext() {
	$("#unscheduled_m_client_combo_id").val('');
	
	market_name=$("#unschedule_market_combo_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_market_next").text("Market required");
		}else{
			$("#err_market_next").text("");			
			$("#btn_unschedule_market").hide();
			$("#wait_image_unschedule_market").show();		
			
			
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getMarketClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
				 success: function(result) {
						
						//alert(result);
						if (result==''){
							$("#err_market_next").text("Sorry Network not available");	
							$("#wait_image_unschedule_market").hide();		
							$("#btn_unschedule_market").show();
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_market_next").html(resultArray[1]);
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();
							}else if (resultArray[0]=='SUCCESS'){
														
								var m_client_string=resultArray[1];
								//----------------
								
								var visit_type="Unscheduled";
								var scheduled_date="";
								
								//-----------------------------------
								
								var mClientList = m_client_string.split('<rd>');
								var mClientListShowLength=mClientList.length	
								
								//var unscheduled_m_client_list='<option value="0" > Select Retailer</option>'
								var unscheduled_m_client_list=''
								for (var i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									if(mClientID!=''){
										//unscheduled_m_client_list+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
										unscheduled_m_client_list+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketRetailerNextLV(\''+mClientName+'-'+mClientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mClientName+'-'+mClientID+'</a></li>';
										}								
								}
								//---class="ui-li-count" +'<img src="location.png" alt="" class="ui-li-icon ui-corner-none">'+'<img src="location.png" alt="">' 
								
								/*var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id');
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
								unscheduled_m_client_combo_ob[0].selectedIndex = 0;*/
								
								var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id_lv');
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
																
								$(".market").html(market_name);								
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								
								localStorage.visit_type=visit_type
								localStorage.scheduled_date=scheduled_date
								
								//-----------------------------------
								$("#err_market_next").text("");
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();
								
								//------- 
								var url = "#page_market_ret";	
								$.mobile.navigate(url);
								
								//unscheduled_m_client_combo_ob.selectmenu("refresh");
								unscheduled_m_client_combo_ob.listview("refresh");
								
							}else{						
								$("#err_market_next").html('Server Error');	
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();						
								}
						}
					  },
				  error: function(result) {			  
					  	$("#err_market_next").html('Invalid Request');
					  	$("#wait_image_unschedule_market").hide();		
						$("#btn_unschedule_market").show();
				  }
			 });//end ajax				
		}			
}

//--------------------------------- Unsheduled visit: retailer next
function marketRetailerNextLV(lvalue) {
	$("#unscheduled_m_client_combo_id").val(lvalue);
	//alert(lvalue);
	marketRetailerNext();	
	}

function marketRetailerNext() {
	$("#err_m_retailer_next").text("");
	visit_client=$("#unscheduled_m_client_combo_id").val();		
	
	if(visit_client=='' || visit_client==0){
			$("#err_m_retailer_next").text("Retailer required");
		}else{
			$("#btn_unschedule_market_ret").hide();
			$("#wait_image_unschedule_market_ret").show();		
			
			visitClientId=visit_client.split('-')[1]
			
			//alert(localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
				 success: function(result) {
						
						if (result==''){
							$("#err_m_retailer_next").text("Sorry Network not available");
							$("#wait_image_unschedule_market_ret").hide();		
							$("#btn_unschedule_market_ret").show();
						}else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_m_retailer_next").html(resultArray[1]);
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();
								
							}else if (resultArray[0]=='SUCCESS'){
								
								var visitMarketStr=resultArray[1];
								var merItemStr=resultArray[2];
								var lastMarketInfoStr=resultArray[3];
								
								//------------------------- Campaign
								localStorage.campaign_string=resultArray[4];
								localStorage.visit_camp_list_str=resultArray[5];
								
								var visit_distributor_nameid=resultArray[6];
								
								localStorage.visit_camp_submit_str=''
								
								//----------------
								localStorage.marchandizingStr=merItemStr
								localStorage.marchandizingInfoStr=''
								
								//----------- empty brand data from local storage
								var brandList = localStorage.brand_list_string.split('<rd>');
								var brandListLength=brandList.length	
								for (var i=0; i < brandListLength; i++){
									var brandName = brandList[i]
									
									if(brandName!=""){
										var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStr]='';	
									}																												
								}
								
								//-------------------	
								localStorage.marketInfoStr=lastMarketInfoStr
								localStorage.marketInfoSubmitStr=''
								
								var lastMarketInfoStrList = lastMarketInfoStr.split('<rd>');
								var lastMarketInfoStrListLength=lastMarketInfoStrList.length
								for (var i=0; i < lastMarketInfoStrListLength; i++){
									var brandNameStrDetails = lastMarketInfoStrList[i]
									
									if(brandNameStrDetails!=''){
										var brandNameStrDetailsList=brandNameStrDetails.split('<fd>');
										var brandNameCurrent=brandNameStrDetailsList[0]
										
										var brandCharStrCurrent=brandNameCurrent.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStrCurrent]=brandNameStrDetails;										
									}
								}
								//----------
								
								$(".market").html(visitMarketStr);
								$(".visit_distributor").html(visit_distributor_nameid);
								$(".visit_client").html(visit_client);
									
								localStorage.visit_client=visit_client
								localStorage.visitMarketStr=visitMarketStr
								localStorage.visit_distributor_nameid=visit_distributor_nameid
								
								localStorage.visit_page="YES"
								
								//--------
								$("#err_m_retailer_next").text("");
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();
		
								var url = "#page_visit";
								$.mobile.navigate(url);
								//location.reload();
								
							}else{						
								$("#err_m_retailer_next").html('Server Error');
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();							
								}
						}
					  },
				  error: function(result) {
					  	$("#err_m_retailer_next").html('Invalid Request');
					  	$("#wait_image_unschedule_market_ret").hide();		
						$("#btn_unschedule_market_ret").show();
				  }
			 });//end ajax
		}
}

//------------------------------Visit: Market Info List Show

//--------------------------------- Order: Show order from home
function getOrder(){	
	var url = "#page_order";	
	$.mobile.navigate(url);	
	//-----
	
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;
	
	for (var i=0; i < productLength; i++){
		var productArray2 = productList[i].split('<fd>');
		var product_id2=productArray2[0];	
		var product_name2=productArray2[1];
		$("#order_qty"+product_id2).val('');
	}
	
	var orderProductList=localStorage.productOrderStr.split('<rd>');
	var orderProductLength=orderProductList.length;
	for (var j=0; j < orderProductLength; j++){
		var orderProductIdQtyList=orderProductList[j].split('<fd>');
		if(orderProductIdQtyList.length==2){
			var orderProductId=orderProductIdQtyList[0];
			var orderProductQty=orderProductIdQtyList[1];		
			$("#order_qty"+orderProductId).val(orderProductQty);
		}		
	}
	
}

//--------------------------------- Order: Set Order data
function getOrderData(){
	var productList2=localStorage.productListStr.split('<rd>');
	var productLength2=productList2.length;
	
	var productOrderStr='';
	//alert(productLength2)
	for (var i=0; i < productLength2; i++){
		var productArray2 = productList2[i].split('<fd>');
		var product_id=productArray2[0];	
		
		var pid=$("#order_id"+product_id).val();
		var pname=$("#order_name"+product_id).val();
		var pqty=$("#order_qty"+product_id).val();
		
		if (pqty!='' && eval(pqty) > 0){
			
			if (productOrderStr==''){
				productOrderStr=pid+'<fd>'+pqty
				productOrderShowStr=pname+'('+pqty+')'
			}else{
				productOrderStr+='<rd>'+pid+'<fd>'+pqty
				productOrderShowStr+=', '+pname+'('+pqty+')'
				}			
		}
		
	};
	localStorage.productOrderStr=productOrderStr
	
	var url = "#page_visit";	
	$.mobile.navigate(url);	
		
	}


//------------ marchandizing: Show marchandizing page

//----------------- Campaign

//-----VISIT SUBMIT
function lscVisitSubmit(){	
	$("#errorChkVSubmit").text("");
	
	visitClientId=localStorage.visit_client.split('-')[1]	
	visit_type=localStorage.visit_type
	scheduled_date=localStorage.scheduled_date
	
	marketInfoStr=localStorage.marketInfoSubmitStr //Generated by Done
	productOrderStr=localStorage.productOrderStr
	marchandizingInfoStr=localStorage.marchandizingInfoStr //Generated by Done
	//marchandizingInfoStr=localStorage.marchandizingStr;
	//campaign_str=localStorage.visit_camp_list_str;
	campaign_str=localStorage.visit_camp_submit_str //Generated by Done
	
	if (marketInfoStr==undefined){
		marketInfoStr=''
		}
	if (productOrderStr==undefined){
		productOrderStr=''
		}
	
	//----------------------- marchandizing status check
	var photoRequired="No";
	
	if (marchandizingInfoStr==undefined){
		marchandizingInfoStr=''
	}else{
		var marchandizingList=marchandizingInfoStr.split('<rd>');	
		var marchandizingItemLength=marchandizingList.length;
		for (var i=0; i < marchandizingItemLength; i++){		
			var marchandizingArray = marchandizingList[i].split('<fd>');
			var item_status=marchandizingArray[5];	
			if(item_status=='Bad'){
				photoRequired="Yes";
				break;
				}
		}
	}
	
	//------------------------
	if (campaign_str==undefined){
		campaign_str=''
		}
	
	var lscPhoto="";
	var lat=$("#lat").val();
	var long=$("#long").val();
	//var now = $.now();
	
	//alert(photoRequired+','+lscPhoto);
	
	if (photoRequired=='Yes' && lscPhoto==''){
		$("#errorChkVSubmit").html('Picture required, Because of Bad marchandizing');
	}else{
		var imageName="";
		
		if (lat==''){
			lat=0
			}
		if (long==''){
			long=0
			}
	
		if (visitClientId=='' || visitClientId==undefined){
			$("#errorChkVSubmit").html('Invalid Client');		
		}else{
			if(visit_type=='' || visit_type==undefined){
				$("#errorChkVSubmit").html('Invalid Visit Type');
			}else{
				$("#btn_visit_submit").hide();
				$("#wait_image_visit_submit").show();		
				
				//alert(localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName)
				// ajax-------
				$.ajax({
					 type: 'POST',
					 url: localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName,
					 success: function(result) {
							
							//alert(result);
							if (result==''){					
								$("#errorChkVSubmit").html('Sorry Network not available');
								$("#wait_image_visit_submit").hide();
								$("#btn_visit_submit").show();									
							}else{					
								var resultArray = result.split('<SYNCDATA>');			
								if (resultArray[0]=='FAILED'){						
									$("#errorChkVSubmit").html(resultArray[1]);
									$("#wait_image_visit_submit").hide();
									$("#btn_visit_submit").show();	
								}else if (resultArray[0]=='SUCCESS'){
									
									//-----------
									localStorage.visit_client=''
									//localStorage.visit_type=''
									//localStorage.scheduled_date=''
									localStorage.marchandizingStr=''
									
									/*localStorage.marketInfoLSCStr=''
									localStorage.marketInfoAkijStr=''
									localStorage.marketInfo7RingsStr=''
									localStorage.marketInfoShahStr=''
									localStorage.marketInfoScanStr=''*/
									
									localStorage.marketInfoStr=''
									localStorage.marketInfoSubmitStr=''
									
									localStorage.productOrderStr=''
									localStorage.marchandizingInfoStr=''	
									localStorage.visit_camp_list_str=''
									localStorage.visit_camp_submit_str=''
									visitCampaginTempArray=[]
									visitCampaginArray=[]
									
									localStorage.visit_page=""
									
									//----------- empty brand data from local storage
									var brandList = localStorage.brand_list_string.split('<rd>');
									var brandListLength=brandList.length	
									for (var i=0; i < brandListLength; i++){
										var brandName = brandList[i]
										
										if(brandName!=""){
											var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
											localStorage[brandCharStr]='';	
										}																														
									}
									
									//-------------
									$("#errorChkVSubmit").html('');
									$("#lat").val('');
									$("#long").val('');
									$("#lscPhoto").val('');
									//document.getElementById('myImage').src = '';
									
									$("#lat_p").val('');
									$("#long_p").val('');								
									
									$("#checkLocation").html('');
									$("#checkLocationProfileUpdate").html('');
									
									$("#wait_image_visit_submit").hide();
									$("#btn_visit_submit").show();
									
									//image upload function									
									//uploadPhotoV(lscPhoto, imageName);
									
									//--
									var url = "#page_confirm_visit_success";	
									$.mobile.navigate(url);
													
								}else{						
									$("#errorChkVSubmit").html('Server Error');
									$("#wait_image_visit_submit").hide();
									$("#btn_visit_submit").show();								
									}
							}
						  },
					  error: function(result) {			  
							$("#errorChkVSubmit").html('Invalid Request');
							$("#wait_image_visit_submit").hide();
							$("#btn_visit_submit").show();	
					  }
				 });//end ajax	
			}
		}
		  
	}
  }


//------------------- Client Profile: Page from home


//----------------------------------Delivery:  Home page Delevery button
function delivery() {	
	
	$("#delivery_distributor_cmb_id").val('');	
	
	var now = new Date();
	var year=now.getUTCFullYear();
	
	var month=now.getUTCMonth()+1;
	if (month<10){
		month="0"+month
		}
	var day=now.getUTCDate();
	if (day<10){
		day="0"+day
		}	
	var currentDay = year+ "-" + month + "-" + day;
	$("#delivery_date").val(currentDay);
	
	var delivery_distributor_cmb_list=localStorage.delivery_distributor_cmb_list;
	
	var delivery_distributor_cmb_ob=$('#delivery_distributor_cmb_id_lv');
	delivery_distributor_cmb_ob.empty()
	delivery_distributor_cmb_ob.append(delivery_distributor_cmb_list);
		
	//-------	
	var url = "#page_del_conf";
	$.mobile.navigate(url);
	//delivery_distributor_cmb_ob.selectmenu("refresh");
	delivery_distributor_cmb_ob.listview("refresh");
}


//----------------------------------- delivery: Distributor Next button
function distributorNextLV(lvalue) {
	$("#delivery_distributor_cmb_id").val(lvalue);	
	distributorNext();	
	}


function distributorNext() {	
	$("#err_distributor").text("");
	
	distributor_name=$("#delivery_distributor_cmb_id").val();
	deliveryDate=$("#delivery_date").val();
	
	var now = new Date();
	var month=now.getUTCMonth()+1;
	if (month<10){
		month="0"+month
		}
	var day=now.getUTCDate();
	if (day<10){
		day="0"+day
		}
		
	var year=now.getUTCFullYear();
	
	var currentDay = new Date(year+ "-" + month + "-" + day);	
	var delivery_date = new Date(deliveryDate);
	
	if (delivery_date=='Invalid Date'){		
		$("#err_distributor").text("Invalid date");
	}else{
		if (delivery_date>currentDay){
			$("#err_distributor").text("Future date not allowed");
		}else{	
			if(distributor_name=='' || distributor_name==0){
					$("#err_distributor").text("Distributor required");
				}else{
					$("#wait_image_delivery_dealer").show();		
					$("#btn_delivery_dealer").hide();
					
					
					var distributorNameId=distributor_name.split('-');
					var dealer_id=distributorNameId[1];
					
					//alert(localStorage.base_url+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&dealer_id='+dealer_id);
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: localStorage.base_url+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&dealer_id='+dealer_id,
						 success: function(result) {
								if (result==''){					
									$("#err_distributor").html('Sorry Network not available');
									$("#wait_image_delivery_dealer").hide();		
									$("#btn_delivery_dealer").show();
								}else{					
									var resultArray = result.split('<SYNCDATA>');			
									if (resultArray[0]=='FAILED'){						
										$("#err_distributor").html(resultArray[1]);
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();
									}else if (resultArray[0]=='SUCCESS'){
											
										var dis_client_string=resultArray[1];
										
										localStorage.delivery_date=deliveryDate;
										localStorage.dis_client_string=dis_client_string;
										localStorage.distributor_name=distributor_name;
										
										//----------------
										var distClientList = localStorage.dis_client_string.split('<rd>');
										var distClientListShowLength=distClientList.length	
										
										//var delivery_retailer_cmb='<select name="distributor_client" id="distributor_client_cmb_id" data-native-menu="false">'						
										var delivery_retailer_cmb='<option value="0" >Select Retailer</option>'
										
										for (var i=0; i < distClientListShowLength; i++){
											var distClientValueArray = distClientList[i].split('<fd>');
											var distClientID=distClientValueArray[0];
											var distClientName=distClientValueArray[1];											
											delivery_retailer_cmb+='<option value="'+distClientName+'-'+distClientID+'" >'+distClientName+'-'+distClientID+'</option>';			
										}	
										
			  							//delivery_retailer_cmb+='</select>'
										//localStorage.delivery_retailer_cmb_list=delivery_retailer_cmb
										
										$(".delivery_dt").html(deliveryDate);
										$(".distributor").html(distributor_name);
										
										//$("#del_product_list_tbl").html(localStorage.product_tbl_del_str);
										
										var delivery_retailer_cmb_ob=$('#delivery_retailer_cmb_id');
										delivery_retailer_cmb_ob.empty()
										delivery_retailer_cmb_ob.append(delivery_retailer_cmb);
										delivery_retailer_cmb_ob[0].selectedIndex = 0;
										
										//--------------
										var productList=localStorage.productListStr.split('<rd>');
										var productLength=productList.length;										
										for (var j=0; j < productLength; j++){				
											var deleveryItemArray = productList[j].split('<fd>');
											var productId=deleveryItemArray[0];											
											jQuery("#delivery_qty"+productId).val("");
										}
										
										//----------------	
										$("#err_distributor").text("");	
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();
														
										var url = "#page_del_item";	
										$.mobile.navigate(url);
										//location.reload();
										delivery_retailer_cmb_ob.selectmenu("refresh");
										
										
									}else{						
										$("#err_distributor").html('Server Error');	
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();						
										}
								}
							  },
						  error: function(result) {			  
							  	$("#err_distributor").html('Invalid Request');
							  	$("#wait_image_delivery_dealer").hide();		
								$("#btn_delivery_dealer").show();
						  }
					 });//end ajax	
			}
		}
	}
	
}

//---------------------------------------delivery: Add delivery Item
var dist_retailer_name="";
var del_supercrit="";
var del_powercrit="";
var clientDelArray=[]

function addDeliveryItem(){
	$("#err_d_retailer").text("");
	
	dist_retailer_name=$("#delivery_retailer_cmb_id").val();
	clientNameIdList=dist_retailer_name.split('-')
	clientId='';
	clientName='';
	if (clientNameIdList.length==2){
		clientName=clientNameIdList[0]
		clientId=clientNameIdList[1]
		}
	
	if(dist_retailer_name=='' || dist_retailer_name==0){
			$("#err_d_retailer").text("Retailer required");
	}else{
		var productList2=localStorage.productListStr.split('<rd>');
		var productLength2=productList2.length;
		
		var productDeleveryStrShow='';	
		var validFlag=false
		for (var i=0; i < productLength2; i++){
			var productArray = productList2[i].split('<fd>');
			var product_id=productArray[0];	
			var product_name=productArray[1];
						
			var pid=$("#delivery_id"+product_id).val();
			var pname=$("#delivery_name"+product_id).val();
			var pQty=$("#delivery_qty"+product_id).val();	
			
			var pqty=0
			try{
				pqty=eval(pQty)
			}catch(ex){
				pqty=0
				validFlag=false
			}
			
			if (pqty!='' && pqty > 0){
				validFlag=true
				if (productDeleveryStrShow==''){
					productDeleveryStrShow=pid+'<fd>'+pqty+'<fd>'+pname					
				}else{
					productDeleveryStrShow+='<rd>'+pid+'<fd>'+pqty+'<fd>'+pname					
					}			
			}			
		}
		
		if (validFlag==true){
			dictList={'clientId':clientId,'clientName':clientName,'clientData':productDeleveryStrShow}
			clientDelArray.push(dictList)
			$("#err_d_retailer").text( clientName+'-'+clientId+", Added successfully.");
			
			}else{
				$("#err_d_retailer").text("Valid Qty required");
			}
					
		}
	}

//--------------------------------------------delivery: Preview delevery Item
function previewDelivery(){
	$("#err_d_retailer").text("");
	
	arrayLength=clientDelArray.length
	
	if(arrayLength<=0){
		$("#err_d_retailer").text("Data not available");		
	}else{
		
		var prev_del_tbl='';	
		var delivery_pro_list=[];
		var deleveryItemArray =[];
		var item_qty='';
		var item_name='';
		var i=0;
		var j=0;
		
		$('#tbl_delivery_item_prev').empty();				
		
		
		for (i=0; i < arrayLength; i++){		
			clientDictData=clientDelArray[i]
			
			clientID=clientDictData['clientId']
			clientName=clientDictData['clientName']
			clientData=clientDictData['clientData']
			
			//alert(clientID+','+clientData);
				
			prev_del_tbl="<table style='width:100%' border='0' cellpadding='0' cellspacing='0'><tr><td width='99%' colspan='2' style='background-color:#92C9C9; color:#F2F9F9; text-shadow:none;'><b>"+clientName+"-"+clientID+"</b><input type='hidden' id='clientId' value='"+clientId+"'></td><td width='1%' style='background-color:#92C9C9; text-align:right; color:#F2F9F9;'><a id='btn_del_x"+i+"' onclick=delete_delivery('"+i+"');>X</a></td></tr>";
			
			delivery_pro_list=clientData.split('<rd>');
			for (j=0; j < delivery_pro_list.length; j++){
				deleveryItemArray = delivery_pro_list[j].split('<fd>');
				
				item_qty=deleveryItemArray[1];
				item_name=deleveryItemArray[2];
				
				prev_del_tbl+="<tr><td width='20%'>"+item_qty+"</td><td colspan='2' width='80%'>"+item_name+"</td></tr>";
				
				}
				
			prev_del_tbl+="</table>";
			
			//alert(prev_del_tbl);
			
			$("#tbl_delivery_item_prev").append(prev_del_tbl).trigger('create');			
				
			}
			
			var url = "#page_del_preview";	
			$.mobile.navigate(url);
	  }
	}

//--------------------------------------------delivery: Delete delevery Item
function delete_delivery(rowid){
		//alert(rowid);
		clientDelArray.splice(rowid,1);
		$("#btn_del_x"+rowid).parent().parent().parent().remove();
	}

//--------------------------------------------delivery: Submit delevery data
function deliverySubmit(){	
	$("#error_del_submit").text("");
		
	var lat=$("#lat").val();
	var long=$("#long").val();
	
	arrayLength=clientDelArray.length
	if(arrayLength<=0){
		$("#error_del_submit").text("Data not available");		
	}else{		
		del_data=''
		for (i=0; i < arrayLength; i++){		
			clientDictData=clientDelArray[i]
			
			clientID=clientDictData['clientId']
			clientData=clientDictData['clientData']
			
			itemQtyStr=''
			delivery_pro_list=clientData.split('<rd>');
			for (j=0; j < delivery_pro_list.length; j++){
				deleveryItemArray = delivery_pro_list[j].split('<fd>');
				item_id=deleveryItemArray[0];
				item_qty=deleveryItemArray[1];
				
				if (itemQtyStr==''){
					itemQtyStr=item_id+'<fd>'+item_qty
				}else{
					itemQtyStr+='<fdfd>'+item_id+'<fd>'+item_qty						
				}
			   }
			
			if (del_data==''){
					del_data=clientID+'<rd>'+itemQtyStr
			}else{
				del_data+='<rdrd>'+clientID+'<rd>'+itemQtyStr		
			}		
		}
		
		if(del_data==''){		
			$("#error_del_submit").text("Data required");
		}else{
			var distributorNameId=localStorage.distributor_name.split('-');
			var dealer_id=distributorNameId[1];			
			var deliveryDate=localStorage.delivery_date;
			
			if(dealer_id=='' || deliveryDate==''){
				$("#error_del_submit").text("Distributor/Delivery Date not available");
			}else{
				
				$("#wait_image_delivery_submit").show();		
				$("#btn_delivery_submit").hide();
				
				//alert(localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long)
				// ajax-------
				$.ajax({
					 type: 'POST',
					 url: localStorage.base_url+'deliverySubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&depot_id='+dealer_id+'&delivery_date='+deliveryDate+'&delivery_data='+del_data+'&lat='+lat+'&long='+long,
					 success: function(result) {
							
							//alert(result);
							if (result==''){					
								$("#error_del_submit").html('Sorry Network not available');								
								$("#wait_image_delivery_submit").hide();		
								$("#btn_delivery_submit").show();
							}else{					
								var resultArray = result.split('<SYNCDATA>');			
								if (resultArray[0]=='FAILED'){						
									$("#error_del_submit").html(resultArray[1]);
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();
									
								}else if (resultArray[0]=='SUCCESS'){
									
									//-----------
									clientDelArray=[]
									localStorage.distributor_name=''	
									localStorage.delivery_date=''
									localStorage.dis_client_string=''		
									//-------------
									$("#error_del_submit").html('');
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();
								
									var url = "#page_delivery_success";	
									$.mobile.navigate(url);
									//location.reload();
									
								}else{						
									$("#error_del_submit").html('Server Error');		
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();					
									}
							}
						  },
					  error: function(result) {			  
						  	$("#error_del_submit").html('Invalid Request');
						  	$("#wait_image_delivery_submit").hide();		
							$("#btn_delivery_submit").show();
					  }
				 });//end ajax	
						
			}
		}
	
	}
}


//----------------------------------Visit Plan Page: Visit Plan button click

//------------------------------------- complain

function getComplain() {	
	$("#error_complain").html('');
	$("#checkLocationComplain").html('');
	
	var complain_type_string=localStorage.complain_type_string
	var complain_from_string=localStorage.complain_from_string
	
	//-----------------------------------	
	var complain_from_List = complain_from_string.split('<rd>');
	var complain_from_ListLength=complain_from_List.length	
	
	var complain_fromList='<option value="0" >Select From</option>'
	for (var i=0; i < complain_from_ListLength; i++){
		var complain_from= complain_from_List[i];		
		if(complain_from!=''){
			complain_fromList+='<option value="'+complain_from+'" >'+complain_from+'</option>';
			}								
	}
	
	var complain_from_id_ob=$('#complain_from_id');
	complain_from_id_ob.empty()
	complain_from_id_ob.append(complain_fromList);
	complain_from_id_ob[0].selectedIndex = 0;
	
	//-----------------------------------	
	var complain_type_List = complain_type_string.split('<rd>');
	var complain_type_ListLength=complain_type_List.length	
	
	var complainTypeList='<option value="0" > Select Type</option>'
	for (var j=0; j < complain_type_ListLength; j++){
		var complain_type= complain_type_List[j];		
		if(complain_type!=''){
			complainTypeList+='<option value="'+complain_type+'" >'+complain_type+'</option>';
			}
	}
	
	var complain_type_id_ob=$('#complain_type_id');
	complain_type_id_ob.empty()
	complain_type_id_ob.append(complainTypeList);
	complain_type_id_ob[0].selectedIndex = 0;
	
	$("#complain_ref").val('');
	$("#complain_details").val('');
	
	//-----------------------------------	
	var url = "#page_complain_new";	
	$.mobile.navigate(url);
	
	complain_from_id_ob.selectmenu("refresh");
	complain_type_id_ob.selectmenu("refresh");			
}

//=====
function complainSubmit(){
	$("#error_complain").html('');
	$("#checkLocationComplain").html('');
	
	var complain_from=$("#complain_from_id").val();
	var complain_ref=$("#complain_ref").val();
	var complain_type=$("#complain_type_id").val();
	var complain_details=$("#complain_details").val();
	
	//------------------------
	var lat=$("#lat_complain").val();
	var long=$("#long_complain").val();
		
	var lscPhotoComplain="";	
	var imageName="";
		
	//Check Photo
	var imageUploadFlag=0;
	if (lscPhotoComplain!=''){
		imageUploadFlag=1;
	}
	
	//Check Latlong
	var latLongFlag=1;
	if (imageUploadFlag==1){
		if (lat=='' || lat==0 || long=='' || long==0){			
			latLongFlag=0;
		}
	}
	
	if (latLongFlag==0){
		$("#error_complain").html('Location not Confirmed');		
	}else{
		
		//----
		if(complain_from=='' || complain_from==0){
			$("#error_complain").html('Complain From Required');
		}else{
			if(complain_ref=='' || complain_ref==0){
				$("#error_complain").html('Reference Required');	
			}else{
				if(complain_type=='' || complain_type==0){
					$("#error_complain").html('Complain Type Required');	
					}else{					
						$("#btn_complain_submit").hide();
						$("#wait_image_complain_submit").show();	
						
						//alert(localStorage.base_url+'complainSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&complain_from='+complain_from+'&complain_ref='+complain_ref+'&complain_type='+complain_type+'&complain_details='+complain_details+'&lat='+lat+'&long='+long+'&photo_name='+imageName)
						
						// ajax-------
						$.ajax({
							 type: 'POST',
							 url: localStorage.base_url+'complainSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&complain_from='+complain_from+'&complain_ref='+complain_ref+'&complain_type='+complain_type+'&complain_details='+complain_details+'&lat='+lat+'&long='+long+'&photo_name='+imageName,
							 success: function(result) {
									
									if (result==''){					
										$("#err_visit_rpt").html('Sorry Network not available');
										$("#wait_image_complain_submit").hide();
										$("#btn_complain_submit").show();
										
									}else{					
										var resultArray = result.split('<SYNCDATA>');			
										if (resultArray[0]=='FAILED'){						
											$("#error_complain").html(resultArray[1]);
											$("#wait_image_complain_submit").hide();
											$("#btn_complain_submit").show();
											
										}else if (resultArray[0]=='SUCCESS'){								
											//-----------
											$("#wait_image_complain_submit").hide();
											$("#btn_complain_submit").show();
											
											var sl=resultArray[1]
											
											//image upload function		
											/*if(imageUploadFlag==1){
												uploadPhotoComplain(lscPhotoComplain, imageName);								
											}*/
											//----
											
											var url = "#page_complain_success";	
											$.mobile.navigate(url);
											
											//----
														
										}else{						
											$("#error_complain").html('Server Error');
											$("#wait_image_complain_submit").hide();
											$("#btn_complain_submit").show();
											}
									}
								  },
							  error: function(result) {			  
								  $("#error_complain").html('Invalid Request');
								  $("#wait_image_complain_submit").hide();
								  $("#btn_complain_submit").show();
							  }
						 });//end ajax	
					}
		}
	 }
	}
  }

//----
function showComplain(){
	$("#error_complain_page").html('');
	/*$("#btn_complain_submit").hide();
	$("#wait_image_complain_submit").show();*/	
	
	$("#tbl_show_complain").empty();
	
	//alert(localStorage.base_url+'showComplain?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode)
	
	// ajax-------
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'showComplain?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
		 success: function(result) {
				
				if (result==''){					
					$("#error_complain_page").html('Sorry Network not available');
					
				}else{					
					var resultArray = result.split('<SYNCDATA>');			
					if (resultArray[0]=='FAILED'){						
						$("#error_complain_page").html(resultArray[1]);
												
					}else if (resultArray[0]=='SUCCESS'){								
						//-----------
						
						var resData=resultArray[1]
						
						
						$("#tbl_show_complain").append(resData).trigger('create');
						
						
						
						//var clientShowImgName=localStorage.photo_url+'client_pic/'+client_photo_str+'?'+new Date().getTime();
						//$("#clientProfileImage").attr("src",clientShowImgName);
						
						
						var url = "#page_complain_show";	
						$.mobile.navigate(url);
						
						//----
									
					}else{						
						$("#error_complain_page").html('Server Error');						
						}
				}
			  },
		  error: function(result) {			  
			  $("#error_complain_page").html('Invalid Request');
		  }
	 });//end ajax
  }


//============= Show Task


//------------------------------ Report part: Show
function getRegionReport() {
	$("#tbl_region_show_report").empty();
	
	var rpt_market_combo_list=localStorage.rpt_market_combo_string;
	
	//-------
	var rpt_market_cmb_id_ob=$('#rpt_market_cmb_id');
	rpt_market_cmb_id_ob.empty()
	rpt_market_cmb_id_ob.append(rpt_market_combo_list);
	rpt_market_cmb_id_ob[0].selectedIndex = 0;
	
	
	//---------
	var rpt_fieldforce_combo_list=localStorage.rpt_fieldforce_combo_string
	
	//-------
	var rpt_field_force_cmb_id_ob=$('#rpt_field_force_cmb_id');
	rpt_field_force_cmb_id_ob.empty()
	rpt_field_force_cmb_id_ob.append(rpt_fieldforce_combo_list);
	rpt_field_force_cmb_id_ob[0].selectedIndex = 0;
	
	
	//-------	
	var url = "#page_report";
	$.mobile.navigate(url);
	rpt_market_cmb_id_ob.selectmenu("refresh");
	rpt_field_force_cmb_id_ob.selectmenu("refresh");
}

//============= Show region Order
function regionOrderReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var market=$("#rpt_market_cmb_id").val();
	var fieldforce=$("#rpt_field_force_cmb_id").val();
	var period=$("#rpt_period_cmb_id").val();
	
	if(market==''){
		$("#err_region_rpt").html('Market Required');
		$("#wait_image_region_report").hide();
		
	}else if(period==''){
		$("#err_region_rpt").html('Period Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var marketId=market.split('-')[1]
		var fieldforceId=fieldforce.split('-')[1]
				
		//alert(localStorage.base_url+'regionOrderReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&marketId='+marketId+'&fieldforceId='+fieldforceId+'&period='+period)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionOrderReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&marketId='+marketId+'&fieldforceId='+fieldforceId+'&period='+period,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
														
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	 
	}
  }


//============= Show region Sales Confirmation
function regionSalesConfReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var market=$("#rpt_market_cmb_id").val();
	var fieldforce=$("#rpt_field_force_cmb_id").val();
	var period=$("#rpt_period_cmb_id").val();
	
	if(market==''){
		$("#err_region_rpt").html('Market Required');
		$("#wait_image_region_report").hide();
		
	}else if(period==''){
		$("#err_region_rpt").html('Period Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var marketId=market.split('-')[1]
		var fieldforceId=fieldforce.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionSalesConfReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&marketId='+marketId+'&fieldforceId='+fieldforceId+'&period='+period,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
														
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	 
	}
  }



//============= Show region Visit Summary
function regionVisitSummaryReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var market=$("#rpt_market_cmb_id").val();
	var fieldforce=$("#rpt_field_force_cmb_id").val();
	var period=$("#rpt_period_cmb_id").val();
	
	if(market==''){
		$("#err_region_rpt").html('Market Required');
		$("#wait_image_region_report").hide();
		
	}else if(period==''){
		$("#err_region_rpt").html('Period Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var marketId=market.split('-')[1]
		var fieldforceId=fieldforce.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionVisitSummaryReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&marketId='+marketId+'&fieldforceId='+fieldforceId+'&period='+period,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
							
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	}
  }



//---------------------- Exit Application
function exit() {	
	navigator.app.exitApp();
}

// ----------------Camera------------

//Image
function getImage() {
	navigator.camera.getPicture(onSuccessV, onFailV, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccessV(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
	imagePath = imageURI;
	$("#lscPhoto").val(imagePath);
}
function onFailV(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

//image Profile
function getImageProfile() {	
	navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccessProfile(imageURI) {
    var image = document.getElementById('myImageProfile');
    image.src = imageURI;
	imagePath = imageURI;
	$("#lscPhotoProfile").val(imagePath);
}
function onFailProfile(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

//image Complain
function getImageComplain() {	
	navigator.camera.getPicture(onSuccessComplain, onFailComplain, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccessComplain(imageURI) {
    var image = document.getElementById('myImageComplain');
    image.src = imageURI;
	imagePath = imageURI;
	$("#lscPhotoComplain").val(imagePath);
}
function onFailComplain(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

//------------------------------------------------------------------------------
//File upload 
function uploadPhotoV(imageURI, imageName) {
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderVisit/"),winV,failV,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),win,fail,options);
}

function winV(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function failV(error) {
	$(".errorChkVSubmit").text('Memory Error. Please take new picture and Submit');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}

//------------------------------------------------------------------------------
//File upload 
function uploadPhotoProfile(imageURI, imageName) {
    var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	
    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderProfile/"),winProfile,failProfile,options);
}

function winProfile(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function failProfile(error) {
	$(".errorConfirmProfileUpdate").text('Memory Error. Please take new picture and Submit');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}

//----------------------------------------------------- 
//File upload
function uploadPhotoComplain(imageURI, imageName){
    var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderComplain/"),winComplain,failComplain,options);
}

function winComplain(r){
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function failComplain(error){
	$(".error_complain").text('Memory Error. Please take new picture and Submit');
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}


//=====================MAP Start=====================


//=====================MAP End=====================