function dhcpSecPortRelay() {
  console.log("dhcpSecPortRelay called");
  with (document.forms[0]) {
    if (getCheckVal("enablePortRelay") == 1) {
      console.log("enablePortRelay is enabled");
      setDisplay("portrelayInfo", 1);
      document.ConfigForm.portDHCPRelayFlag.value = "Yes";
    } else {
      console.log("enablePortRelay is disabled");
      setDisplay("portrelayInfo", 0);
      document.ConfigForm.portDHCPRelayFlag.value = "No";
    }
  }
}

function checkportcheckboxstate() {
  console.log("checkportcheckboxstate called");
  var vForm = document.ConfigForm;

  if (vForm.PortRelay_lan1.checked) {
    console.log("PortRelay_lan1 checked");
    vForm.portLan1.value = "Yes";
  } else {
    console.log("PortRelay_lan1 not checked");
    vForm.portLan1.value = "No";
  }
  if (vForm.PortRelay_lan2.checked) {
    console.log("PortRelay_lan2 checked");
    vForm.portLan2.value = "Yes";
  } else {
    console.log("PortRelay_lan2 not checked");
    vForm.portLan2.value = "No";
  }
  if (vForm.PortRelay_lan3.checked) {
    console.log("PortRelay_lan3 checked");
    vForm.portLan3.value = "Yes";
  } else {
    console.log("PortRelay_lan3 not checked");
    vForm.portLan3.value = "No";
  }
  if (vForm.PortRelay_lan4.checked) {
    console.log("PortRelay_lan4 checked");
    vForm.portLan4.value = "Yes";
  } else {
    console.log("PortRelay_lan4 not checked");
    vForm.portLan4.value = "No";
  }
  if (vForm.PortRelay_ssid1.checked) {
    console.log("PortRelay_ssid1 checked");
    vForm.portSSID1.value = "Yes";
  } else {
    console.log("PortRelay_ssid1 not checked");
    vForm.portSSID1.value = "No";
  }
  if (vForm.PortRelay_ssid2.checked) {
    console.log("PortRelay_ssid2 checked");
    vForm.portSSID2.value = "Yes";
  } else {
    console.log("PortRelay_ssid2 not checked");
    vForm.portSSID2.value = "No";
  }
  if (vForm.PortRelay_ssid3.checked) {
    console.log("PortRelay_ssid3 checked");
    vForm.portSSID3.value = "Yes";
  } else {
    console.log("PortRelay_ssid3 not checked");
    vForm.portSSID3.value = "No";
  }
  if (vForm.PortRelay_ssid4.checked) {
    console.log("PortRelay_ssid4 checked");
    vForm.portSSID4.value = "Yes";
  } else {
    console.log("PortRelay_ssid4 not checked");
    vForm.portSSID4.value = "No";
  }
}

function GetEndSubStartCount(EndIp, StartIp) {
  console.log(
    "GetEndSubStartCount called with EndIp:",
    EndIp,
    "StartIp:",
    StartIp
  );
  var vret;
  addrEnd = EndIp.split(".");
  addrStart = StartIp.split(".");
  E = parseInt(addrEnd[3]) + 1;
  S = parseInt(addrStart[3]);
  vret = E - S;
  console.log("Calculated vret:", vret);
  return vret;
}

function lan_dns_check() {
  console.log("lan_dns_check called");
  var landns_val = getRadioVal("dns_config");
  var config_status = "Disable";
  document.getElementById("PRIDNS").value =
    document.getElementById("primarydnsserver").value;
  document.getElementById("SECDNS").value =
    document.getElementById("secondarydnsserver").value;
  document.getElementById("config_dns").value = landns_val;

  if (config_status.localeCompare(landns_val)) {
    console.log("DNS config is not disabled");
    if (document.getElementById("PRIDNS").value.length) {
      console.log("Primary DNS value present");
      if (isValidIpAddress(document.getElementById("PRIDNS").value) == false) {
        console.error("Primary DNS address is invalid!");
        alert("Address is invalid!");
        return false;
      }
    } else {
      console.error("Primary DNS value missing");
      alert("atleast primary dns server IPv4 address is mandatory.");
      return false;
    }
    if (document.getElementById("SECDNS").value.length) {
      console.log("Secondary DNS value present");
      if (isValidIpAddress(document.getElementById("SECDNS").value) == false) {
        console.error("Secondary DNS address is invalid!");
        alert("Address is invalid!");
        return false;
      }
    }
  } else {
    console.log("DNS config is disabled");
    if (document.getElementById("PRIDNS").value.length) {
      console.log("Primary DNS value present (disabled)");
      if (isValidIpAddress(document.getElementById("PRIDNS").value) == false) {
        console.error("Primary DNS address is invalid! (disabled)");
        alert("Address is invalid!");
        return false;
      }
    }
    if (document.getElementById("SECDNS").value.length) {
      console.log("Secondary DNS value present (disabled)");
      if (isValidIpAddress(document.getElementById("SECDNS").value) == false) {
        console.error("Secondary DNS address is invalid! (disabled)");
        alert("Address is invalid!");
        return false;
      }
    }
  }
  console.log("lan_dns_check passed");
  return true;
}

function btnSaveIPv4() {
  console.log("btnSaveIPv4 called");
  if (false == lan_dns_check()) {
    console.log("lan_dns_check returned false");
    return false;
  }
  if (CheckForm(1) == false) {
    console.log("CheckForm(1) returned false");
    return false;
  }
  var vForm = document.ConfigForm;
  vForm.EthendIPcount.value = GetEndSubStartCount(
    vForm.dhcpEthEnd.value,
    vForm.dhcpEthStart.value
  );
  vForm.DeviceendIPcount.value = GetEndSubStartCount(
    vForm.dhcpEthEndFrag.value,
    vForm.dhcpEthStartFrag.value
  );

  checkportcheckboxstate();

  vForm.IPV4_Flag.value = "1";
  if (true == setEBooValueCookie(vForm)) {
    console.log("setEBooValueCookie returned true, submitting form");
    vForm.submit();
  } else {
    console.log("setEBooValueCookie returned false, not submitting form");
  }
}

function devicedhcpRelay() {
  console.log("devicedhcpRelay called");
  var vForm = document.ConfigForm;
  if (vForm.enableRelay.checked) {
    console.log("enableRelay checked");
    vForm.DeviceDHCPRelayFlag.value = "Yes";
  } else {
    console.log("enableRelay not checked");
    vForm.DeviceDHCPRelayFlag.value = "No";
  }
}

function initLeaseTimeTable() {
  console.log("initLeaseTimeTable called");
  var leaseTime = "86400";
  var optname = new Array("1Minute :", "1Hour :", "1Day :", "1week");
  var optvalue = new Array("60", "3600", "86400", "604800");
  var cusname = leaseTime + "seconds";
  var hascusopt = true;
  var isSel = 0;

  with (getElById("dhcpLeasedTimeFrag")) {
    for (i = 0; i < optname.length; i++) {
      var opt = new Option(optname[i], optvalue[i]);
      if (leaseTime == optvalue[i]) {
        console.log("Lease time matches option value:", optvalue[i]);
        opt.selected = true;
        isSel = i;
        hascusopt = false;
      }
      options.add(opt);
      options[isSel].setAttribute("selected", "true");
    }

    if (hascusopt && isInteger(leaseTime) && "0" != leaseTime) {
      console.log("Adding custom lease time option:", leaseTime);
      var optcus = new Option(cusname, leaseTime);
      optcus.selected = true;
      options.add(optcus);
      isSel = i;
      options[isSel].setAttribute("selected", "true");
    }
  }
}
