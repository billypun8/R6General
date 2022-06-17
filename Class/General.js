const { attackers, defenders } = require('./Operator.json');
var players = require("./Players");

function assign(action, filter = null, filterValue = null) {
    // Ensure have player
    let msgPrefix = '';
    let filterMsg = '';

    if (players.players.length == 0) {
        return "No Player!"
    }

    // Choose Team
    let team;
    if (action == "attack") {
        team = attackers;
        oTeam = attackers;
    } else {
        team = defenders;
        oTeam = defenders;
    }

    // Apply Filter
    if (filter) {
        filterMsg = `Filter: ${filter}, Value: ${filterValue}.\n\n`;
        team = team.filter(operator => operator[filter] == filterValue);
    }

    if (team.length == 0) {
        if (action == "attack") {
            team = oTeam;
        } else {
            team = oTeam;
        }
        msgPrefix = 'Wrong filter value. Assign operators without filter.\n\n'
        filterMsg = '';
    }

    // Operator left
    let left;
    if (team.length < players.players.length) {
        left = oTeam.filter(x => !team.includes(x))
    }

    if (team.length < players.players.length) {
        for (let index = 0; index < (players.players.length - team.length); index++) {
            let i = getRandomIndex(team.length);
            team.push(left[i])
            left.splice(i, 1);
        }
        team = left;
        filterMsg += "Not enough filtered operator. Use other operators.\n\n";
    }

    // Assign Operators
    let assigned = [];
    players.players.forEach(p => {
        let i = getRandomIndex(team.length);
        let o = team[i];
        team.splice(i, 1);
        assigned.push(p.username + " : " + o.name + ".\n\n")
    });

    return msgPrefix + filterMsg + assigned.join("");
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * (max - 1));
}

module.exports = assign;