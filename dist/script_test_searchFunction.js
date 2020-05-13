var pokemonRepository = function() {
    var t = [],
        o = "https://pokeapi.co/api/v2/pokemon/?limit=150",
        n = $("#modal-container");

    function e(o) {
        t.push(o)
    }
    $(".pokemon_list");


    $(document).ready(function(){
        $("#mySearchInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#pokeSearchDiv * ").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });



    function i(t) {
        pokemonRepository.loadDetails(t).then(function() {
            $(".modal-title").html(""), $("#item-height").html(""), $("#item-weight").html(""), $("#pokemon-front").attr("src", ""), a(t)
        })
    }

    function a(t) {
        console.log(t);
        var o = $("<h5>" + t.name + "</h5>"),
            n = $("<p>Height: " + t.height + "</p>"),
            e = $("<p>Weight: " + t.weight + "</p>");
        $(".modal-title").html(o), $("#item-height").html(n), $("#item-weight").html(e), $("#pokemon-front").attr("src", t.imageUrlFront)
    }

    function l() {
        $(n).removeClass("is-visible")
    }
    return $(n).on("click", l), $(window).keydown(function(t) {
        "Escape" === t.key && $(n).addClass("is-visible") && l()
    }), {
        add: e,
        getAll: function() {
            return t
        },
        addListItem: function(t) {
            var o = $(".pokemon_list"),
                n = $("<li>"),
                e = $('<button type="button" class="btn btn-primary btn-lg btn-block btn-list-group-item" data-toggle="modal" data-target="#pokemonModal">' + t.name + "</button>");
            n.append(e), o.append(n), $(e).on("click", function() {
                i(t)
            })
        },
        loadList: function() {
            return $.ajax(o).then(function(t) {
                t.results.forEach(function(t) {
                    e({
                        name: t.name,
                        detailsUrl: t.url
                    })
                })
            }).catch(function(t) {
                console.error(t)
            })
        },
        loadDetails: function(t) {
            var o = t.detailsUrl;
            return $.ajax(o).then(function(o) {
                t.imageUrlFront = o.sprites.front_default, t.imageUrlBack = o.sprites.back_default, t.height = o.height, t.weight = o.weight
            }).catch(function(t) {
                console.error(t)
            })
        },
        showDetails: i,
        showModal: a,
        hideModal: l
    }
}();
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(t) {
        pokemonRepository.addListItem(t)
    })
});