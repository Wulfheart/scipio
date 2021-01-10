import * as t from '../../src/map'
import colors from '../../src/colors'
window.onload = function () {
    document.getElementById('map').innerHTML = window.classical;
    var map = new t.Map(document.querySelector('#map>svg'), 50);
    
    map.colorProvinces(['stp', 'mos', 'sev', 'ukr', 'war', 'lvn'], colors.Classical.Russia)
    .colorProvinces(['gal', 'vie', 'boh', 'bud', 'tri', 'tyr'], colors.Classical.Austria)
    .colorProvinces(['kie', 'ber', 'ruh', 'mun', 'sil', 'pru'], colors.Classical.Germany)
    .colorProvinces(['syr', 'arm', 'ank', 'con', 'smy'], colors.Classical.Turkey)
    .colorProvinces(['pie', 'ven', 'tus', 'apu', 'nap', 'rom'], colors.Classical.Italy)
    .colorProvinces(['pic', 'bre', 'par', 'gas', 'bur', 'mar'], colors.Classical.France)
    .colorProvinces(['wal', 'lon', 'yor', 'edi', 'cly', 'lvp'], colors.Classical.England)
    map.setArmy('lon', colors.Classical.England)
    map.setFleet('wal', colors.Classical.England)
    // map.setFleet('nth', colors.Classical.England)
}
