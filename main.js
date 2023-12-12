

const matchupTableContainer = document.querySelector('.table-container');
const playrateTableContainer = document.querySelector('.playratecontainer');
function calculateBackgroundColor(score) {
    if (score >= 15 && score < 35) {
        // Transition from #cf5149 to #e97870
        const startColor = [207, 81, 73];
        const endColor = [233, 120, 112];
        const t = (score - 15) / 20;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else if (score >= 35 && score < 50) {
        // Transition from #e7a09b to #e8d1d0
        const startColor = [231, 160, 155];
        const endColor = [232, 209, 208];
        const t = (score - 35) / 15;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else if (score >= 50 && score < 60) {
        // Transition from #aefb9d to #69e84d
        const startColor = [174, 251, 157];
        const endColor = [105, 232, 77];
        const t = (score - 50) / 10;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else if (score >= 60 && score < 70) {
        // Transition from #71c883 to #3bd95c
        const startColor = [113, 200, 131];
        const endColor = [59, 217, 92];
        const t = (score - 60) / 10;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else if (score >= 70 && score < 80) {
        // Transition from #6bd29d to #21e480
        const startColor = [107, 210, 157];
        const endColor = [33, 228, 128];
        const t = (score - 70) / 10;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else if (score >= 80 && score <= 100) {
        // Transition from #2da166 to #179a57
        const startColor = [45, 161, 102];
        const endColor = [23, 154, 87];
        const t = (score - 80) / 20;
        const red = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
        const green = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
        const blue = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    // For scores outside of the specified ranges, return a default color
    return 'rgb(255, 255, 255)';
}






function getLogoURL(deckName) {
    const regionMatch = deckName.match(/\(([^)]+)\)/);
    if (regionMatch) {
        const regions = regionMatch[1].split('/');
        if (regions.length === 1) {
            // Use trim to remove any leading/trailing spaces
            const region1 = regions[0].trim().toLowerCase();
            
            const logo1URL = `https://masteringruneterra.com/wp-content/plugins/deck-viewer/assets/images/factions/${region1}.svg`;
            
            return [logo1URL];
        }
        if (regions.length > 2) {
            let array = []
            regions.forEach(element => {
                const region = element.trim().toLowerCase();
                const logoURL = `https://masteringruneterra.com/wp-content/plugins/deck-viewer/assets/images/factions/${region}.svg`;
                array.push(logoURL)
            });
            return array;
        }
       
        if (regions.length === 2) {
            // Use trim to remove any leading/trailing spaces
            const region1 = regions[0].trim().toLowerCase();
            const region2 = regions[1].trim().toLowerCase();
            const logo1URL = `https://masteringruneterra.com/wp-content/plugins/deck-viewer/assets/images/factions/${region1}.svg`;
            const logo2URL = `https://masteringruneterra.com/wp-content/plugins/deck-viewer/assets/images/factions/${region2}.svg`;
            return [logo1URL, logo2URL];
        }
    }
    return ['', ''];
}

// Function to fetch data as a Promise
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading data:', error);
            throw error;
        });
}




async function populateTable() {
    try {
        const data = await fetchData('matchupData.json');
        const deckData = data.data;
        const table = document.getElementById('matchup-table');
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        const headerRow = document.createElement('tr');
        headerRow.id = "firstrow"
        // headerRow.classList.add("row1")
        const th = document.createElement('th');
        th.id = 'firstcellrow'
        th.style.position = "sticky";
        
        th.innerHTML = '<th class="input-cell" id="bujji"><div class="archetype-label">Archetype <span class="triangle-up">&#9650</span><span class="triangle-down">&#9660;</span></div><input id="vamsi123" class="archetype-input" type="text" placeholder="Search..."></th>';
  
        headerRow.appendChild(th);
        deckData.forEach(deck => {
            const th = document.createElement('th');
            th.classList.add('rotate');
            const [logoURL1, logoURL2,logoURL3] = getLogoURL(deck.deck_name);
            if (logoURL1 == null && logoURL2 == null && logoURL3 == null) {
                th.innerHTML = `
                <div class="deck-info">
                    ${deck.deck_name}
                   
                </div>
            `;
            }
            else if (logoURL1 != null && logoURL2 == null && logoURL3 == null) {
                th.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container">
                        <img class="logo" src="${logoURL1}" alt="Region 1">

                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            else if (logoURL1 != null && logoURL2 != null && logoURL3 == null) {
                th.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container" >
                        <img class="logo" src="${logoURL1}" alt="Region 1">   
                        <img class="logo" src="${logoURL2}" alt="Region 2">    
                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            else{
                th.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container">
                        <img class="logo" src="${logoURL1}" alt="Region 1">   
                        <img class="logo" src="${logoURL2}" alt="Region 2"> 
                        <img class="logo" src="${logoURL3}" alt="Region 3">
                            
                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        deckData.forEach((deck,index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', deck.winrate);
            const rowHeading = document.createElement('th');
            rowHeading.id = "firstcolrow"
            
            const [logoURL1, logoURL2,logoURL3] = getLogoURL(deck.deck_name);
            if (logoURL1 == "" && logoURL2 == "" && logoURL3 == null) {
                rowHeading.innerHTML = `
                <div class="deckinfo" style="text-align: center;">
                    <span class="name">${deck.deck_name}</span>
                   
                </div>
            `;
            }
            else if (logoURL1 != null && logoURL2 == null && logoURL3 == null) {
                rowHeading.innerHTML = `
                <div class="deckinfo">
                    
                    <span class="logo-container" style="margin-right: 10px;">
                        <img class="logo" src="${logoURL1}" alt="Region 1" originalUrl="${logoURL1}">
                           
                    </span>
                    <span class="name">${deck.deck_name.replace(/\(.*\)/, '').substring(0, 14)}</span>
                </div>
            `;
            }
            else if(logoURL1 != null && logoURL2 != null && logoURL3 == null){
                rowHeading.innerHTML = `
                <div class="deckinfo">
                    
                    <span class="logo-container" style="margin-right: 5px;">
                        <img class="logo" src="${logoURL1}" alt="Region 1" originalUrl="${logoURL1}">
                        <img class="logo" src="${logoURL2}" alt="Region 2" originalUrl="${logoURL2}">   

                           
                    </span>
                    <span class="name">${deck.deck_name.replace(/\(.*\)/, '').substring(0, 14)}</span>
                </div>
            `;
            }
            else{
                rowHeading.innerHTML = `
                <div class="deckinfo">
                   
                    <span class="logo-container">
                        <img class="logo" src="${logoURL1}" alt="Region 1" originalUrl="${logoURL1}">
                        <img class="logo" src="${logoURL2}" alt="Region 2" originalUrl="${logoURL2}">   
                        <img class="logo" src="${logoURL3}" alt="Region 3" originalUrl="${logoURL3}"> 
                          
                    </span>
                    <span class="name">${deck.deck_name.replace(/\(.*\)/, '').substring(0, 14)}</span>
                </div>
            `;
            }
            
            // rowHeading.textContent = deck.deck_name;
            row.appendChild(rowHeading);

            deck.opponents.forEach(opponent => {
                
                const td = document.createElement('td');
                if (opponent.winrate) {
                    td.textContent = parseFloat(opponent.winrate).toFixed(2) + '%';
                    td.style.backgroundColor = calculateBackgroundColor(parseFloat(opponent.winrate));
                    // const cellData = `${deck.deck_name} vs ${opponent.op_deck} - Matches: ${opponent.total_matches}, Wins: ${parseFloat(opponent.winrate).toFixed(2)}%`;
                    // const cellInfo = document.createElement('div');
                    // cellInfo.classList.add('cell-info', 'strong');
                    // cellInfo.textContent = cellData;
                    const cur_info = document.createElement('span')
                    const opp_info = document.createElement('span')
                    const [logoURL1, logoURL2,logoURL3] = getLogoURL(deck.deck_name);
                            if (logoURL1 == "" && logoURL2 == "" && logoURL3 == null) {
                                cur_info.innerHTML = `
                                <span>
                                    ${deck.deck_name}
                                
                                </span>
                            `;
                            }
                            else if (logoURL1 != null && logoURL2 == null && logoURL3 == null) {
                                cur_info.innerHTML = `
                                <span>
                                    ${deck.deck_name.replace(/\(.*\)/, '')}
                                    <span class="logo-container">
                                        <img class="logo" src="${logoURL1}" alt="Region 1">
                                        
                                    </span>
                                </span>
                            `;
                            }
                            else if(logoURL1 != null && logoURL2 != null && logoURL3 == null){
                                cur_info.innerHTML = `
                                <span>
                                    ${deck.deck_name.replace(/\(.*\)/, '')}
                                    <span class="logo-container">
                                        <img class="logo" src="${logoURL1}" alt="Region 1">
                                        <img class="logo" src="${logoURL2}" alt="Region 2">   
                                       
                                    </span>
                                </span>
                            `;
                            }
                            else{
                                cur_info.innerHTML = `
                                <span>
                                    ${deck.deck_name.replace(/\(.*\)/, '')}
                                    <span class="logo-container">
                                        <img class="logo" src="${logoURL1}" alt="Region 1">
                                        <img class="logo" src="${logoURL2}" alt="Region 2">   
                                        <img class="logo" src="${logoURL3}" alt="Region 3">   
                                        
                                    </span>
                                </span>
                            `;
                            }
                            
                    const [logourl1, logourl2,logourl3] = getLogoURL(opponent.op_deck);
                            if (logourl1 == "" && logourl2 == "" && logourl3 == null) {
                                opp_info.innerHTML = `
                                <p>
                                    ${opponent.op_deck}
                                
                                </p>
                            `;
                            }
                            else if (logourl1 != null && logourl2 == null && logourl3 == null) {
                                opp_info.innerHTML = `
                                <span>
                                    ${opponent.op_deck.replace(/\(.*\)/, '')}
                                    <div class="logo-container">
                                        <img class="logo" src="${logourl1}" alt="Region 1">
                                        
                                    </div>
                                </span>
                            `;
                            }
                            else if(logourl1 != null && logourl2 != null && logourl3 == null){
                                opp_info.innerHTML = `
                                <span>
                                    ${opponent.op_deck.replace(/\(.*\)/, '')}
                                    <span class="logo-container">
                                        <img class="logo" src="${logourl1}" alt="Region 1">
                                        <img class="logo" src="${logourl2}" alt="Region 2">    
                                    </span>
                                </span>
                            `;
                            }
                            else{
                                opp_info.innerHTML = `
                                <span>
                                    ${opponent.op_deck.replace(/\(.*\)/, '')}
                                    <span class="logo-container">
                                        <img class="logo" src="${logourl1}" alt="Region 1">
                                        <img class="logo" src="${logourl2}" alt="Region 2">  
                                        <img class="logo" src="${logourl3}" alt="Region 3">  
                                        
                                    </span>
                                </span>
                            `;
                            }
            
                    
            
                    const cellInfo = document.createElement('div');
                    cellInfo.classList.add('cell-info', 'strong');
                    cellInfo.innerHTML = `<div class="tool-tip"><p id="current-player">${cur_info.innerHTML}</p><div id="rest-content"><p id="opponent-player">Opponent: ${opp_info.innerHTML}</p><p id="opponent-player">Matches: ${opponent.total_matches}</p><p id="opponent-player">Win Rate: ${parseFloat(opponent.winrate).toFixed(2)}%</p></div>`
                    td.appendChild(cellInfo);
                    if (deck.deck_name === opponent.op_deck) {
                        td.classList.add('marked-cell');
                    }
                } else {
                    td.textContent = '-';
                }
                row.appendChild(td);
                
            });
            tbody.appendChild(row);
            document.getElementById('loader-container').style.display = 'none';
            document.getElementById('content').style.display = 'block';
         

            
        });
    } catch (error) {
        console.error('Error populating table:', error);
    }



}



// Add a scroll event listener to the Match-Up table container
matchupTableContainer.querySelector("table").addEventListener('scroll', function() {
    // Synchronize the scroll position of the Play rate table container
    playrateTableContainer.querySelector("table").scrollLeft = matchupTableContainer.querySelector("table").scrollLeft;
});



// ...



async function populatePlayrateTable() {
    const data = await fetchData('matchupData.json');
    const deckData = data.data;
    const playrateTable = document.querySelector('.playratecontainer .playrate-table tbody tr');
 
    const firstcell = document.createElement('th');
    firstcell.innerHTML = '<div class="firstcell">Play rate</div>';
    playrateTable.appendChild(firstcell);

    // Define the fixed width for the bars
    const barWidth = '60px'; // Adjust the width as needed

        // Select the first row of the matchup table as a reference
        //const referenceMatchupRow = document.querySelector('.table-container table tbody tr:first-child');
    
    // Get the width of the reference cell in the first row
    //const referenceCell = referenceMatchupRow.querySelector('td');
    //const cellWidth = referenceCell.clientWidth + 'px';
    

    deckData.forEach(data => {
        const td = document.createElement('td');
        td.classList.add('playrate-td');
        // td.style.width = cellWidth;
        const barHeight = (parseFloat(data.playrate)) * 7;

        // Create the bar element with fixed width and appropriate height
        const bar = document.createElement('div');
        bar.classList.add('bar');
       
        bar.style.height = `${(barHeight)*2.5}%`;
        
        
        // Display the playrate value as text content within the cell
        // td.textContent = `${(data.playrate)}%`;
        // td.style.textAlign = "center"

        const label = document.createElement('div');
        label.classList.add('label');
        label.textContent = `${data.playrate}%`;
        
        // Append the bar to the cell
        td.appendChild(bar);
        td.append(label)
        
        // Append the cell to the table
        playrateTable.appendChild(td);
    });
}








matchupTableContainer.addEventListener('scroll', function() {
    // Synchronize the scroll position of the Play rate table container
    playrateTableContainer.querySelector("table").scrollLeft = matchupTableContainer.querySelector("table").scrollLeft;
});






                        
async function winrateTable() {
    const data = await fetchData('matchupData.json');
    const deckData = data.data;
    const playrateTable = document.querySelector('.winratecontainer .winrate-table tbody');
    const firstcell = document.createElement('thead')
    const firstrow = document.createElement("tr")
    const firstheading = document.createElement("th")
    firstheading.classList.add("winrateFirstcell")
    firstheading.style.padding = "0 5px 0 0"
    firstheading.innerHTML = '<div><p>EW</p><span><button id="winrateUp">↑</button><button id="winrateDown">↓</button></span></div>'
    firstrow.appendChild(firstheading)
    firstcell.appendChild(firstrow)

    playrateTable.appendChild(firstcell);
    deckData.forEach((data,index) => {
        const tr = document.createElement('tr');
        // tr.classList.add("playrate-td")
        const backgroundColor = calculateBackgroundColor(parseFloat(data.winrate+30.00));
        tr.innerHTML = `<th style="background-color: ${backgroundColor}; border: 3px solid white;">${data.winrate}%</th>`;
        tr.setAttribute('data-id', index);

        //const backgroundColor = calculateBackgroundColor(parseFloat(data.winrate));
        playrateTable.appendChild(tr);
    });

 
    const winrateUpButton = document.getElementById('winrateUp');
    const winrateDownButton = document.getElementById('winrateDown');

    // Add event listeners to the ascending and descending buttons
    winrateUpButton.addEventListener('click', function() {
        console.log("clicked");
        sortTable('ascending');
    });

    winrateDownButton.addEventListener('click', function() {
        console.log("clicked");
        sortTable('descending');
    });

    

}




fetchData('matchupData.json')
    .then(data => {
        console.log(data)
        populateTable(data);

        populatePlayrateTable(data);
        winrateTable(data);
        
        
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('loader-container').style.display = 'none';
    })
    
   // Get references to the winrate table and the buttons
   const winrateTable1 = document.querySelector('.winratecontainer .winrate-table');
   const winrateHeader = document.querySelector('.winrateFirstcell');
   
function extractNumericPart(winrateCell) {
    // Extract numeric part (excluding percentage sign) and convert to a number
    return parseFloat(winrateCell.textContent.replace('%', ''));
}












function sortTable(order) {
    const rows = Array.from(document.querySelectorAll('.winratecontainer .winrate-table tbody tr')).splice(1);
    const mainrows = Array.from(document.getElementById("matchup-table").querySelectorAll("tbody tr"));
    // for (let index = 0; index < mainrows.length; index++) {
    //     const id = mainrows[index].getAttribute('data-id')
    //     console.log(id)
    // }

    rows.sort((rowA, rowB) => {

        const idA = parseInt(rowA.getAttribute('data-id'));
        const idB = parseInt(rowB.getAttribute('data-id'));


        const valueA = extractNumericPart(rowA);
        const valueB = extractNumericPart(rowB);

        if (order === 'ascending') {
            return valueA - valueB || idA-idB;
        } else {
            return valueB - valueA || idB-idA;
        }
    });


    mainrows.sort((rowA,rowB) => {
        const idA = parseInt(rowA.getAttribute('data-id'));
        const idB = parseInt(rowB.getAttribute('data-id'));

        if (order == "ascending") {
            return idA - idB;
        }
        else{
           return idB - idA
        }

    })

    const winrateTable = document.querySelector('.winratecontainer .winrate-table tbody');
    
    rows.forEach(row => winrateTable.appendChild(row));
    

    const matchupTable = document.getElementById("matchup-table").querySelector("tbody");

    mainrows.forEach(row => matchupTable.appendChild(row))


    

    
  
}














const matchupTableContainer2 = document.querySelector('#matchup-table');
const winrateTableContainer = document.querySelector('.winratecontainer').querySelector("table");

// Add a scroll event listener to the Match-Up table container
matchupTableContainer2.addEventListener('scroll', function() {
    // Synchronize the scroll position of the Play rate table container
    winrateTableContainer.scrollTop = matchupTableContainer2.scrollTop;
});






document.querySelector('table').addEventListener('mouseover', function (event) {
    const target = event.target;
    const grandparent = target.closest('.rotate');

    if (target.classList.contains('logo') && !grandparent) {
        showStarIcon(target);
    }
});

document.querySelector('table').addEventListener('mouseout', function (event) {
    const target = event.target;
    const grandparent = target.closest('.rotate');

    if (target.classList.contains('logo') && !grandparent) {
        hideStarIcon(target);
    }
});

document.querySelector('table').addEventListener('click', function (event) {
    const target = event.target;
    const grandparent = target.closest('.rotate');
    const validGrandparent = target.closest('.logo-container')

    if (target.classList.contains('logo') && !grandparent) {
        const logos = validGrandparent.querySelectorAll('.logo');

        // Check if any logo is favorited
        if (logos.length > 0) {
            let isFavorited = logos[0].classList.contains('favorite');

            logos.forEach(logo => {
                if (isFavorited) {
                    logo.classList.remove('favorite');
                    isFavorited = false
                    hideStarIcon(logo);
                } else {
                    logo.classList.add('favorite');
                    isFavorited = true
                    showStarIcon(logo);
                }
            });

            // Your additional logic for favoriting/unfavoriting the entire cell
            // ...

            // Log to the console for testing
            alert(`Cell favorited: ${isFavorited}`);
        }
    }
});

function showStarIcon(image) {
    image.src = "./star.png"; // Replace with your star icon path
}

function hideStarIcon(image) {
    const originalUrl = image.getAttribute('originalUrl');
    if (originalUrl) {
        image.src = originalUrl;
    }
}

// Your existing toggleFavorite function remains the same
function toggleFavorite(image) {
    if (image.classList.contains('favorite')) {
        // If it's already a favorite, remove the class and update data-original-src
        image.classList.remove('favorite');
        hideStarIcon(image);
        // Your JavaScript logic for unfavoriting
        alert("Logo unfavorited!");
    } else {
        // If it's not a favorite, add the class and update data-original-src
        image.classList.add('favorite');
        showStarIcon(image);
        // Your JavaScript logic for favoriting
        alert("Logo favorited!");
    }
}


// Close the dropdown list when clicking outside the input field
document.addEventListener('click', function(event) {
      const dropdownList = document.getElementById('dropdown-list');
      if (event.target !== document.getElementById('inputField') && event.target.parentNode !== dropdownList) {
        dropdownList.style.display = 'none';
      }
});


 async function showDropdown() {
      const liElementsArray = [];
      const inputText = document.querySelector("#matchup-table thead tr #firstcellrow input").value.toLowerCase();
      const dropdownList = document.getElementById('dropdown-list');
     
      
    //   const values = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Orange', 'Strawberry'];

      const data = await fetchData('matchupData.json')
      const deckData = data.data;

    // Clear previous list items
      dropdownList.innerHTML = '';

      deckData.forEach(deck => {
            const li = document.createElement("li");
            const [logoURL1, logoURL2,logoURL3] = getLogoURL(deck.deck_name);
            if (logoURL1 == null && logoURL2 == null && logoURL3 == null) {
                li.innerHTML = `
                <div class="deck-info">
                    ${deck.deck_name}
                   
                </div>
            `;
            }
            else if (logoURL1 != null && logoURL2 == null && logoURL3 == null) {
                li.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container">
                        <img class="logo" src="${logoURL1}" alt="Region 1">

                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            else if (logoURL1 != null && logoURL2 != null && logoURL3 == null) {
                li.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container" >
                        <img class="logo" src="${logoURL1}" alt="Region 1">   
                        <img class="logo" src="${logoURL2}" alt="Region 2">    
                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            else{
                li.innerHTML = `
                <div class="deck-info">
                    
                    <span class="logo-container">
                        <img class="logo" src="${logoURL1}" alt="Region 1">   
                        <img class="logo" src="${logoURL2}" alt="Region 2"> 
                        <img class="logo" src="${logoURL3}" alt="Region 3">
                            
                    </span>
                    ${deck.deck_name.replace(/\(.*\)/, '')}
                </div>
            `;
            }
            liElementsArray.push(li)
        });

        
       





      // If no input is entered, show all values
      if (!inputText) {
        liElementsArray.forEach(listItem => {
          
          
          listItem.addEventListener('click', () => {
            //add logic here
            document.getElementById('inputField').value = value;
            console.log("clicked")
            
            dropdownList.style.display = 'none';
          });
          dropdownList.appendChild(listItem);
        });
        dropdownList.style.display = 'block';
        return;
      }

      // Filter values based on input
      const filteredLiElements = liElementsArray.filter(li => {
            const deckName = li.querySelector('.deck-info').textContent.trim().toLowerCase();
            console.log(deckName)
            return deckName.includes(inputText.toLowerCase());
        });

      // Populate the dropdown list
      filteredLiElements.forEach(listItem => {
        
        
        listItem.addEventListener('click', () => {
            //add logic here
          document.getElementById('inputField').value = value;
          dropdownList.style.display = 'none';
        });
        dropdownList.appendChild(listItem);
      });

      // Show or hide the dropdown list
      if (filteredLiElements.length > 0) {
        dropdownList.style.display = 'block';
      } else {
        dropdownList.style.display = 'none';
      }
}






window.onload = function() {
    setTimeout(function() {
        console.log("loaded");
        // Assuming you have an input field with the ID 'yourInputField'
        const inputField = document.querySelector("#matchup-table thead tr #firstcellrow input");

        // Attach a click event listener to the input field
        inputField.addEventListener('click', function() {
            // Run the showDropdown function when the input field is clicked
            showDropdown();
        });

    }, 5000);
};

// window.onload = setTimeout(function() {
//     console.log("loaded")
//     const cellinfo = document.querySelectorAll("#matchup-table tbody tr td .cell-info");
//     // console.log(archetypeInput)
//     if (cellinfo) {
//         // Add your event listener here
//         cellinfo.forEach(element => {
//             element.addEventListener("mouseover", function() {
//                 if (element.scrollHeight > element.clientHeight) {
//                     console.log('The content is overflowing!');
//                     element.style.top = "-60px"
//                     // You can add your code to handle the overflow here
//                   } else {
//                     console.log('The content is not overflowing.');
//                   }
//             })
//         });
//     }
    
   
// }, 5000)

