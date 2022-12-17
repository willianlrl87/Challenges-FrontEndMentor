const daysName = document.querySelectorAll('.dayName');
const daysAmount = document.querySelectorAll('.dayAmount');
const daysChart = document.querySelectorAll('.dayChart')

const data = api().then(resolve => resolve);

async function api (){
        const dataFetch = await fetch('data.json');
        const dataJson = await dataFetch.json();
        let index = 0;
        let totalAmount = 0

        while(index < daysName.length){
            daysName[index].innerText = dataJson[index].day;
            daysAmount[index].innerText = `$${dataJson[index].amount}`;
            totalAmount += dataJson[index].amount;
            index++;
        }
        index = 0;
        while(index < daysChart.length){
            const dayAmount = dataJson[index].amount;
            const chartHeight = ((dayAmount / totalAmount) * 100)*4;
            daysChart[index].style.height = `${chartHeight}px `;
            index++;
        }        
        return dataJson;
}

//Active bars with click or touch
const days = document.querySelectorAll('.day');
const daysArray = Array.from(days);


daysArray.forEach(dayChart => {
    dayChart.addEventListener('mouseover', event => {
        handleChartBar(event);
    });
    dayChart.addEventListener('mouseout', event => {
        handleChartBar(event);
    });
    dayChart.addEventListener('click', event => {
        handleChartBar(event);
    });
});

function handleChartBar(event){
    if(event.type == 'mouseover'){
        event.target.parentNode.classList.add('activeMouseover');
    }

    if(event.type == 'click'){
        event.target.parentNode.classList.toggle('activeTouchOrClick')
    }
    if(event.type == 'mouseout'){
        event.target.parentNode.classList.remove('activeMouseover');
    }
}
