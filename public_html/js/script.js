/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */






var jpdbBaseURL = 'http://api.login2explore.com:5577';
var connToken = '90932176|-31949215765002474|90963961';

var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var empDBName = 'EMPLOYEE-DB';
var empRelationName = 'EmployeeData';

setBaseUrl(jpdbBaseURL);

function disableCtrl(ctrl){
    $('#new').prop('disabled' , ctrl);
    $('#save').prop('disabled' , ctrl);
    $('#edit').prop('disabled' , ctrl);
    $('#change').prop('disabled' , ctrl);
    $('#reset').prop('disabled' , ctrl);  
}

function disableNav(ctrl){
    $('#first').prop('disabled' , ctrl);
    $('#prev').prop('disabled' , ctrl);
    $('#next').prop('disabled' , ctrl);
    $('#last').prop('disabled' , ctrl);
}

function disableForm(bValue) {
    $('#empId').prop('disabled', bValue);
    $('#empname').prop('disabled', bValue);
    $('#empsal').prop('disabled', bValue);
    $('#hra').prop('disabled', bValue);
    $('#da').prop('disabled', bValue);
    $('#deduct').prop('disabled', bValue);
}

function initEmpForm() {
    localStorage.removeItem('first_rec_no');
    localStorage.removeItem('last_rec_no');
    localStorage.removeItem('rec_no');
    
    console.log("initEmpForm() - done");    
    
}

function makeDataFromEmpty() {
    $('#empId').val('');
    $('#empname').val('');
    $('#empsal').val('');
    $('#hra').val('');
    $('#da').val('');
    $('#deduct').val('');
} 



function saveData() {
    var jsonStrObj = validateData();
    if(jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken , jsonStrObj , empDBName , empRelationName);
    jQuery.ajaxSetup({async : false});
    var jsonObj = executeCommand(putRequest , jpdbIML);
    jQuery.ajaxSetup({async : true});
    if(isNoRecordPresentLS()) {
        setFirstRecNO2LS(jsonObj);
    }
    setLastRecNo2LS(jsonObj);
    setCurrRecNo2LS(jsonObj);
    resetForm();
}

function setCurrRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no" , data.rec_no);  
}

function getCurrRecNoFromLS() {
    return localStorage.getItem("rec_no");  
}

function setFirstRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    if(data.rec_no === undefined) {
        localStorage.setItem("first_rec_no" , "0");
    }else{
        localStorage.setItem("first_rec_no" , data.rec_no);
    }
}

function getFirstRecNoFromLS() {
    return localStorage.getItem("first_rec_no");  
}

function setLastRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    if(data.rec_no === undefined) {
        localStorage.setItem("last_rec_no" , "0");
    }else{
        localStorage.setItem("last_rec_no" , data.rec_no);
    }
      
}

function getLastRecNoFromLS() {
    return localStorage.getItem("last_rec_no");  
}

function getEmpFromEmpID() {
    var empId = $('#empId').val();
    var jsonStr = { 
        id : empId
    };
    var getRequest  = createGET_BY_KEYRequest(connToken , empDBName , empRelationName , JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async : false});
    var jsonObj = executeCommandAtGivenBaseURL(getRequest, jpdbBaseURL , jpdbIRL);
    if(jsonObj.status === 400){
        $('#save').prop('disabled' , false);
        $('#reset').prop('disabled' , false);
        $('#empname').focus();
    }else if( jsonObj.status === 200) {
        showData(jsonObj);
    }
    jQuery.ajaxSetup({async : true});
}   

function newForm() {
    makeDataFromEmpty();  // Clear form fields
    disableForm(false);   // Enable form fields for editing
    $('#empId').focus();  // Focus on the first field (empid)
    disableNav(true);     // Disable navigation buttons
    disableCtrl(true);    // Disable other control buttons
    
    // Enable Save and Reset buttons for the new form
    $('#save').prop('disabled', false);
    $('#reset').prop('disabled', false);
}


function resetForm() {
    disableCtrl(true);
    disableForm(false);
    
    var getCurrRequest = createGET_BY_RECORDRequest(connToken , empDBName , empRelationName , getCurrRecNoFromLS());
    jQuery.ajaxSetup({async : false});
    var result = executeCommand(getCurrRequest , jpdbIRL);
    showData(result);
    jQuery.ajaxSetup({async : true});
    
    if(isOnlyOneRecordPresent() || isNoRecordPresentLS()) {
        disableNav(true);
    }
    $('#new').prop('disabled' , false);
    if(isNoRecordPresentLS()) {
        makeDataFormEmpty();
        $('#edit').prop('disabled' , true);
    }else{
        $('#edit').prop('disabled' , false);
    }
    disableForm(true);
}


function validateData() {
    var empId = $("#empId").val().trim();
    var empname = $("#empname").val().trim();
    var empsal = $("#empsal").val().trim();
    var hra = $("#hra").val().trim();
    var da = $("#da").val().trim();
    var deduct = $("#deduct").val().trim();
    
    if (empId === '') {
        alert("Employee ID missing");
        $("#empId").focus();
        return "";
    }
    if (empname === '') {
        alert("Employee Name missing");
        $("#empname").focus();
        return "";
    }
    if (empsal === '') {
        alert("Employee Salary missing");
        $("#empsal").focus();
        return "";
    }
    if (hra === '') {
        alert("HRA missing");
        $("#hra").focus();
        return "";
    }
    if (da === '') {
        alert("DA missing");
        $("#da").focus();
        return "";
    }
    if (deduct === '') {
        alert("Deduction missing");
        $("#deduct").focus();
        return "";
    }

    var jsonStrObj = {
        id: empId,
        name: empname,
        salary: empsal,
        hra: hra,
        da: da,
        deduction: deduct
    };
    return JSON.stringify(jsonStrObj);
}


function getFirst() {
    var getFirstRequest = createFIRST_RECORDRequest(connToken , empDBName , empRelationName);
    jQuery.ajaxSetup({async : false});
    var result = executeCommand(getFirstRequest , jpdbIRL);
    showData(result);
    setFirstRecNo2LS(result);
    jQuery.ajaxSetup({async : true});
    $('#empId').prop('disabled' , true);
    $('#first').prop('disabled' , true);
    $('#prev').prop('disabled' , true);
    $('#next').prop('disabled' , false);
    $('#save').prop('disabled' , true);
}

function getPrev() {
    var r = getCurrRecNoFromLS() ;
    if(r === 1){
        $('#firsr').prop('disabled' , true);
        $('#prev').prop('disabled' , true);
    } 
   var getPrevRequest = createPREV_RECORDRequest(connToken , empDBName , empRelationName , r) ;
   jQuery.ajaxSetup({async : false});
   var result = executeCommand(getPrevRequest , jpdbIRL);
   showData(result);
   jQuery.ajaxSetup({async : true});
   var r = getCurrRecNoFromLS();
    if(r === 1){
        $('#prev').prop('disabled' , true);
        $('#first').prop('disabled' , true);
    } 
    $('#save').prop('disabled' , true);
}

function getNext() {
    var r = getCurrRecNoFromLS();
    
    var getPrevRequest = createNEXT_RECORDRequest(connToken , empDBName , empRelationName , r) ;
    jQuery.ajaxSetup({async : false});
    var result = executeCommand(getPrevRequest , jpdbIRL);
   showData(result);
   jQuery.ajaxSetup({async : true});
   
    $('#save').prop('disabled' , true);
}

function getLast() {
    var getLastRequest = createLAST_RECORDRequest(connToken , empDBName , empRelationName) ;
    jQuery.ajaxSetup({async : false});
    var result = executeCommand(getLastRequest , jpdbIRL);
    setLastRecNo2LS(result);
    showData(result);
   jQuery.ajaxSetup({async : true});
   $('#first').prop('disabled' , true);
   $('#prev').prop('disabled' , true);
   $('#last').prop('disabled' , true);
   $('#next').prop('disabled' , true);
    $('#save').prop('disabled' , true);
}
 
 function showData(jsonObj) {
    if(jsonObj.status === 400){
        return ; 
    }
    var data = (JSON.parse(jsonObj.data)).record;
    setCurrRecNo2LS(jsonObj);
    
    $('#empId').val(data.id);
    $('#empname').val(data.name);
    $('#empsal').val(data.salary);
    $('#hra').val(data.hra);
    $('#da').val(data.da);
    $('#deduct').val(data.deduction);
    
    disableNav(false);
    disableForm(true);
    
    $('#save').prop('disabled', true);
    $('#change').prop('disabled' , true);
    $('#reset').prop('disabled' , true);
    $('#new').prop('disabled' , false);
    $('#edit').prop('disabled' , false);
 
    if (getCurrRecNoFromLS() === getLastecNoFromLS())
    {

        $("#next").prop("disabled", true);
        $("#last").prop("disabled", true);
        return;
    }
    if (getCurrRecNoFromLS() === getFirstRecNoFromLS())
    {
        $("#first").prop("disabled", true);
        $("#prev").prop("disabled", true);
        return;
    }
}



function editData() {
    disableForm(false);
    $('#empId').prop('disabled' , true);
    $('#empname').focus();
    
    disableNav(true);
    disableCtrl(true);
    $('#change').prop('disabled' , false);
    $('#reset').prop('disabled' , false);
}


function changeData() {
    jsonChg = validateData() ;
    var updateRequest = createUPDATERecordRequest(connToken , jsonChg , empDBName , empRelationName , getCurrRecNoFromLS());
    jQuery.ajaxSetup({async : false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest , jpdbBaseURL , jpdbIML);
    jQuery.ajaxSetup({async : true});
    console.log(jsonObj);
    resetForm();
    $('#empId').focus();
    $('#edit').focus();
}


function isOnlyRecordPresentLS() {
    if( isNoRecordPresentLS()){
        return false;
    }
    if(getFirstRecNoFromLS() === getLastRecNoFromLS()){
        return true;
    }
    return false;
}

function isNoRecordPresentLS() {
    if(getFirstRecNoFromLS() === "0" && getLastRecNoFromLS() === "0"){
        return true;
    }
    return false;
}
function checkForNoOrOneRecord() {
    if( isNoRecordPresentLS()){
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $('#new').prop('disabled' , false);
        return;
    }
    if( isOnlyOneRecordPresentLS()){
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $('#new').prop('disabled' , false);
        $('#edit').prop('disabled' , false);
        return;
    }
}

initEmpForm();
getFirst();
getLast();
checkForNoOrOneRecord();
