function calculateTip() {
  const inputs = document.querySelectorAll('.ammount-imput');
  let isValid = true;

  inputs.forEach(input => {
    let value = input.value.trim();

    // 如果输入为空，自动将其设置为0
    if (value === '') {
      input.value = '0';
      value = '0';
    }

    // 验证输入是否为非负数
    if (parseFloat(value) < 0 || isNaN(parseFloat(value))) {
      input.style.borderColor = 'red'; // 显示红色边框
      isValid = false;
    } else {
      input.style.borderColor = ''; // 如果输入有效，移除红色边框
    }
  });

  if (!isValid) {
    return; // 如果有无效输入，则不继续计算
  }

  var euros100 = parseInt(document.getElementById('100').value);
  var euros50 = parseInt(document.getElementById('50').value);
  var euros20 = parseInt(document.getElementById('20').value);
  var euros10 = parseInt(document.getElementById('10').value);
  var euros5 = parseInt(document.getElementById('5').value);
  var euros2 = parseInt(document.getElementById('2').value);
  var euros1 = parseInt(document.getElementById('1').value);
  var cents50 = parseInt(document.getElementById('50cents').value);
  var cents20 = parseInt(document.getElementById('20cents').value);
  var cents10 = parseInt(document.getElementById('10cents').value);
  var cents5 = parseInt(document.getElementById('5cents').value);
  var cents2 = parseInt(document.getElementById('2cents').value);
  var cents1 = parseInt(document.getElementById('1cent').value);
  var hoursInput = document.getElementById('hours').value;
  var hours = hoursInput.split(',');

  var totalPayment = (euros100 * 100 + euros50 * 50 + euros20 * 20 + euros10 * 10 + euros5 * 5 + euros2 * 2 +
    euros1 * 1 + cents50 * 0.50 + cents20 * 0.20 + cents10 * 0.10 + cents5 * 0.05 + cents2 * 0.02 + cents1 * 0.01);

  var employees = hours.length;

  var tips = [];
  var totalHours = 0;

  for (var i = 0; i < employees; i++) {
    var hour = parseFloat(hours[i]);
    if (hour >= 6) {
      hour -= 0.5; // 扣除0.5小時的休息時間
    }
    totalHours += hour;
  }

  for (var j = 0; j < employees; j++) {
    var hour = parseFloat(hours[j]);
    if (hour >= 6) {
      hour -= 0.5; // 扣除0.5小時的休息時間
    }
    var tipAmount = (hour / totalHours) * totalPayment;
    tips.push(tipAmount.toFixed(2));
  }

  var totalElement = document.getElementById('total');
  var resultsElement = document.getElementById('results');

  totalElement.innerHTML = 'Total Tip Amount: ' + totalPayment.toFixed(2) + ' Euro';

  resultsElement.innerHTML = '<h3>Tips per Employee:</h3>';

  var adjustedTotal = 0;
  var adjustment = totalPayment - tips.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  for (var j = 0; j < employees; j++) {
    var employeeNumber = 'Employee ' + (j + 1) + ' (' + hours[j] + ' hours';
    var tipAmount = parseFloat(tips[j]);

    if (hours[j] >= 6) {
      employeeNumber += ', 0.5hr break';
    }

    employeeNumber += ')';
    resultsElement.innerHTML += employeeNumber + ': ' + tipAmount.toFixed(2) + ' Euro<br>';

    adjustedTotal += tipAmount;
  }

  var roundingDifference = totalPayment - adjustedTotal;
  if (roundingDifference !== 0) {
    var lastTipIndex = employees - 1;
    var lastTip = parseFloat(tips[lastTipIndex]);
    lastTip = (lastTip + roundingDifference).toFixed(2);
    resultsElement.innerHTML = resultsElement.innerHTML.replace('Employee ' + employees, 'Employee ' + (lastTipIndex + 1));
    resultsElement.innerHTML = resultsElement.innerHTML.replace(tips[lastTipIndex] + ' Euro', lastTip + ' Euro');
  }
}

function fillHours(hoursString) {
  document.getElementById('hours').value = hoursString;
}

function toggleCollapse(elementId) {
  var element = document.getElementById(elementId);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}