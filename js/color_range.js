function style(feature){
    return{
        fillColor: getColor(feature.properties.total_metric),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
/*
function getColor(d){
    if ((0 <= d) && (d < 10))
        return '#fff7f3';
    else if ((10 <= d) && (d < 20))
        return '#fde0dd';
    else if ((20 <= d) && (d < 30))
        return '#fcc5c0';
    else if ((30 <= d) && (d < 40))
        return '#fa9fb5';
    else if ((40 <= d) && (d < 50))
        return '#f768a1';
    else if ((50 <= d) && (d < 60))
        return '#dd3497';
    else if ((60 <= d) && (d < 70))
        return '#ae017e';
    else if ((70 <= d) && (d < 80))
        return '#7a0177';
    else if ((80 <= d) && (d < 90))
        return '#49006a';
    else if ((90 <= d) && (d <= 100))
        return '#28003b';
}*/

function getColor(d) {
    if(d > 300) 
        return'#800026';
    else if(d > 250)
        return'#BD0026';
    else if(d > 200)
        return'#E31A1C';
    else if(d > 150)
        return '#FC4E2A';
    else if(d > 100)
        return '#FD8D3C';
    else if(d > 50)
        return '#FEB24C';
    else if(d > 10)
        return '#FED976';
    else
        return '#FFEDA0';
}