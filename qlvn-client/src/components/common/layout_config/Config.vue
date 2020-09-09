<template>
    <div>
        <!-- Options -->
        <div id="nav-colors">
            Navbar
            <button id="pink" class="btn"></button>
            <button id="red" class="btn"></button>
            <button id="purple" class="btn"></button>
            <button id="blue" class="btn"></button>
            <button id="green" class="btn"></button>
            <button id="yellow" class="btn"></button>
            <button id="orange" class="btn"></button>
        </div>
        <div id="font-colors">
            Font
            <button id="white" class="btn"></button>
            <button id="black" class="btn"></button>
        </div>
        <div id="edges">
            Edges
            <button id="rounded" class="btn">Rounded</button>
            <button id="square" class="btn">Square</button>
        </div>
        <h1>Minimal Bootstrap Navbar</h1>
     </div>
</template>
<script>
export default {
    mounted () {
        let $ = this._$
        // Navbar colors
        $('#nav-colors > .btn').click(function(){
            if($(this).is('#pink')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #ff5858, #f857a6)')
                $('.dropdown-menu').css('background','#ff5858')
            }
            else if($(this).is('#red')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #d31027, #ea384d)')
                $('.dropdown-menu').css('background','#d31027')
            }
            else if($(this).is('#purple')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #41295a, #2f0743)')
                $('.dropdown-menu').css('background','#41295a')
            }
            else if($(this).is('#blue')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #396afc, #2948ff)')
                $('.dropdown-menu').css('background','#396afc')
            }
            else if($(this).is('#green')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #add100, #7b920a)')
                $('.dropdown-menu').css('background','#add100')
            }
            else if($(this).is('#yellow')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #f7971e, #ffd200)')
                $('.dropdown-menu').css('background','#f7971e')
            }
            else if($(this).is('#orange')) {
                $('.navbar-nav').css('background','linear-gradient(to right, #e43a15, #e65245)')
                $('.dropdown-menu').css('background','#e43a15')
            }
        })

        // Font colors
        $('#font-colors > .btn').click(function(){
            if($(this).is('#white')) {
                $('.navbar-nav .fa, .link, a').css('color','white')
                $('.icon-bar').css('background','white')
            }
            else if($(this).is('#black')) {
                $('.navbar-nav .fa, .link, a').css('color','black')
                $('.icon-bar').css('background','black')
            }
        })

        // edges
        $('#edges > .btn').click(function(){
            if($(this).is('#rounded')) {
                $('.navbar-nav, .form-control').css('border-radius','8px')
                if($(window).width() > 768) {
                    $('.dropdown-menu').css({
                        'border-bottom-right-radius':'8px',
                        'border-bottom-left-radius':'8px'
                    })
                }
            }
            else if($(this).is('#square')) {
                $('.navbar-nav, .form-control').css('border-radius','0')
                $('.dropdown-menu').css({
                    'border-bottom-right-radius':'0',
                    'border-bottom-left-radius':'0'
                })
            }
        })
    }
}
</script>
