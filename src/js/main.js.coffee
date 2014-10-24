((window) ->
  PathLoader = (el) ->
    @el = el
    @el.style.strokeDasharray = @el.style.strokeDashoffset = @el.getTotalLength()

  PathLoader::_draw = (val) ->
    @el.style.strokeDashoffset = @el.getTotalLength() * (1 - val)

  PathLoader::setProgress = (val, callback) ->
    @_draw val
    setTimeout callback, 200  if callback and typeof callback is 'function'

  PathLoader::setProgressFn = (fn) ->
    fn this  if typeof fn is 'function'

  window.PathLoader = PathLoader

) window

(->
  init = ->
    onEndInitialAnimation = ->
      @removeEventListener animEndEventName, onEndInitialAnimation  if support.animations
      startLoading()

    window.addEventListener 'scroll', noscroll
    classie.add container, 'loading'

    if support.animations
      container.addEventListener animEndEventName, onEndInitialAnimation
    else
      onEndInitialAnimation()

  startLoading = ->
    simulationFn = (instance) ->
      progress = 0
      interval = setInterval(->
        progress = Math.min(progress + Math.random() * 0.1, 1)
        instance.setProgress progress

        if progress is 1
          classie.remove container, 'loading'
          classie.add container, 'loaded'
          clearInterval interval

          onEndHeaderAnimation = (ev) ->
            if support.animations
              return  if ev.target isnt header
              @removeEventListener animEndEventName, onEndHeaderAnimation
            classie.add document.body, 'layout-switch'
            window.removeEventListener 'scroll', noscroll

          if support.animations
            header.addEventListener animEndEventName, onEndHeaderAnimation
          else
            onEndHeaderAnimation()
      , 50)

    loader.setProgressFn simulationFn

  noscroll = ->
    window.scrollTo 0, 0

  support = animations: Modernizr.cssanimations
  container = document.getElementById('container')
  header = container.querySelector('header.header')
  loader = new PathLoader(document.getElementById('ip-loader-circle'))
  animEndEventNames =
    WebkitAnimation: 'webkitAnimationEnd'
    OAnimation: 'oAnimationEnd'
    msAnimation: 'MSAnimationEnd'
    animation: 'animationend'

  animEndEventName = animEndEventNames[Modernizr.prefixed('animation')]
  init()
)()
