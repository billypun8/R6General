const { attackers } = require('./Operator.json');
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
        team = attackers;
        oTeam = attackers;
    }

    // Apply Filter
    if (filter) {
        filterMsg = `Filter: ${filter}, value=${filterValue}. `;
        team = team.filter(operator => operator.filter == filterValue);
    }

    if (team.length == 0) {
        if (action == "attack") {
            team = oTeam;
        } else {
            team = oTeam;
        }
        msgPrefix = 'Wrong filter value. Assign operators without filter. '
        filterMsg = '';
    }

    // Operator left
    let left;
    if (team.length < players.players.length) {
        left = oTeam.filter(x => !team.includes(x))
    }

    // Assign Operators
    let assigned = [];
    players.players.forEach(p => {
        if (team.length == 0) {
            team = left;
        }
        let i = getRandomIndex(team.length);
        console.log(i);

        let o = team[i];
        team.splice(i, 1);
        assigned.push(p.username + " : " + o.name)
    });
    return msgPrefix + filterMsg + assigned.join(", ") + ".";
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * (max - 1));
}

module.exports = assign;