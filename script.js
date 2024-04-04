$(document).ready(function() {
            const delay = 500; /* 1 milliseconds delay */
            let maxRequest = 100;
            let requestCounter = 1;

            function fetchPokemonCard(i) {
                let apiKey = "ac153920-e3c7-4036-9640-a3c3110a491a";
                $.get(`https://api.pokemontcg.io/v2/cards/ex11-${i}?apiKey=${apiKey}"`, function(response) {
                    let card = response.data;

                    let cardHtml = `
							<div class="pokemon-card">
								<img class="pokemon-img" src="${card.images.small}" id="${card.id}" alt="${card.name}">
								<p>${card.name}</p>
							</div>
                    `;
                    /* Append the Pokémon card HTML to the container */
                    $('#pokemon-container').append(cardHtml);
                    if (requestCounter < maxRequest) {
                        /* Delay 50 milliseconds before sending the next request */
                        setTimeout(() => {
                            fetchPokemonCard(requestCounter + 1);
                            requestCounter++;
                        }, delay);
                    }

                }, 'json');
            }
            /* Get pokemon ID when card is clicked */
            function getPokemonId(callback) {
                $("#pokemon-container").on("click", ".pokemon-img", function() {
                    let pokemonId = $(this).attr("id");
                    callback(pokemonId);
                });
            }

            function showModal(pokemonId) {
                {
                    $.get(`https://api.pokemontcg.io/v2/cards/${pokemonId}`, function(response) {
                        console.log(response);
                        let pokemon = response.data;
                        let cardModal = `
                            <h3>${pokemon.name}</h3>
                            <p>${pokemon.types}</p>
                        `;
                        $(".dialog-form").html(cardModal);
                        $("#modal").show();
                        $("<div class='modal-backdrop'></div>").appendTo("body");
                        /* document.getElementById('close-modal').close(); */
                    }, "json").fail(function() {
                        console.log("Error fetching the card");
                    });
                }
            }

            $("#close-modal").click(function() {
                $("#modal").hide();
                $(".modal-backdrop").remove();
            });

            fetchPokemonCard(1);
            getPokemonId(showModal);

        });

