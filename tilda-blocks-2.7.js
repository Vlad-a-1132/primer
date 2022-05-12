function t142_checkSize(recId) { var rec = document.getElementById('rec' + recId); if (!rec) return; var button = rec.querySelector('.t142__submit'); if (!button) return; var buttonStyle = getComputedStyle(button, null); var buttonPaddingTop = parseInt(buttonStyle.paddingTop) || 0; var buttonPaddingBottom = parseInt(buttonStyle.paddingBottom) || 0; var buttonHeight = button.clientHeight - (buttonPaddingTop + buttonPaddingBottom) + 5; var textHeight = button.scrollHeight; if (buttonHeight < textHeight) { button.classList.add('t142__submit-overflowed') } }
function t228__init(recid) {
    var rec = document.getElementById('rec' + recid); if (!rec) return; var menuBlock = rec.querySelector('.t228'); var mobileMenu = rec.querySelector('.t228__mobile'); var linkItems = rec.querySelectorAll('.t-menu__link-item'); linkItems = Array.prototype.slice.call(linkItems); var menuSubLinkItems = rec.querySelectorAll('.t-menusub__link-item'); var rightBtn = rec.querySelector('.t228__right_buttons_but .t-btn'); var mobileMenuPosition = mobileMenu ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position : ''; var mobileMenuDisplay = mobileMenu ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display : ''; var isFixedMobileMenu = mobileMenuPosition === 'fixed' && mobileMenuDisplay === 'block'; var overflowEvent = document.createEvent('Event'); var noOverflowEvent = document.createEvent('Event'); overflowEvent.initEvent('overflow', !0, !0); noOverflowEvent.initEvent('nooverflow', !0, !0); if (menuBlock) { menuBlock.addEventListener('overflow', function () { t228_checkOverflow(recid) }); menuBlock.addEventListener('nooverflow', function () { t228_checkNoOverflow(recid) }) }
    rec.addEventListener('click', function (e) { var targetLink = e.target.closest('.t-menusub__target-link'); if (targetLink && window.isMobile) { if (targetLink.classList.contains('t-menusub__target-link_active')) { if (menuBlock) menuBlock.dispatchEvent(overflowEvent) } else { if (menuBlock) menuBlock.dispatchEvent(noOverflowEvent) } } }); linkItems.forEach(function (linkItem) { linkItem.addEventListener('click', function () { if (linkItem.classList.contains('t-menusub__target-link') || linkItem.classList.contains('tooltipstered') || linkItem.classList.contains('t794__tm-link')) return; if (mobileMenu && isFixedMobileMenu) mobileMenu.click() }) }); Array.prototype.forEach.call(menuSubLinkItems, function (linkItem) { linkItem.addEventListener('click', function () { if (mobileMenu && isFixedMobileMenu) mobileMenu.click() }) }); if (rightBtn) { rightBtn.addEventListener('click', function () { if (mobileMenu && isFixedMobileMenu) mobileMenu.click() }) }
    if (menuBlock) { menuBlock.addEventListener('showME601a', function () { var menuLinks = rec.querySelectorAll('.t966__menu-link'); Array.prototype.forEach.call(menuLinks, function (menuLink) { menuLink.addEventListener('click', function () { if (mobileMenu && isFixedMobileMenu) mobileMenu.click() }) }) }) }
}
function t228_highlight() {
    var url = window.location.href; var pathname = window.location.pathname; if (url.substr(url.length - 1) === '/') { url = url.slice(0, -1) }
    if (pathname.substr(pathname.length - 1) === '/') { pathname = pathname.slice(0, -1) }
    if (pathname.charAt(0) === '/') { pathname = pathname.slice(1) }
    if (pathname === '') { pathname = '/' }
    var shouldBeActiveElements = document.querySelectorAll('.t228__list_item a[href=\'' + url + '\'], ' + '.t228__list_item a[href=\'' + url + '/\'], ' + '.t228__list_item a[href=\'' + pathname + '\'], ' + '.t228__list_item a[href=\'/' + pathname + '\'], ' + '.t228__list_item a[href=\'' + pathname + '/\'], ' + '.t228__list_item a[href=\'/' + pathname + '/\']'); Array.prototype.forEach.call(shouldBeActiveElements, function (link) { link.classList.add('t-active') })
}
function t228_checkAnchorLinks(recid) { if (window.innerWidth >= 980) { var rec = document.getElementById('rec' + recid); var navLinks = rec ? rec.querySelectorAll('.t228__list_item a[href*=\'#\']') : []; navLinks = Array.prototype.filter.call(navLinks, function (navLink) { return !navLink.classList.contains('tooltipstered') }); if (navLinks.length) { setTimeout(function () { t228_catchScroll(navLinks) }, 500) } } }
function t228_checkOverflow(recid) { var rec = document.getElementById('rec' + recid); var menu = rec ? rec.querySelector('.t228') : null; if (!menu) return; var mobileContainer = document.querySelector('.t228__mobile_container'); var mobileContainerHeight = t228_getFullHeight(mobileContainer); var windowHeight = document.documentElement.clientHeight; var menuPosition = menu.style.position || window.getComputedStyle(menu).position; if (menuPosition === 'fixed') { menu.classList.add('t228__overflow'); menu.style.setProperty('height', (windowHeight - mobileContainerHeight) + 'px', 'important') } }
function t228_checkNoOverflow(recid) { var rec = document.getElementById('rec' + recid); if (!rec) return !1; var menu = rec.querySelector('.t228'); var menuPosition = menu ? menu.style.position || window.getComputedStyle(menu).position : ''; if (menuPosition === 'fixed') { if (menu) menu.classList.remove('t228__overflow'); if (menu) menu.style.height = 'auto' } }
function t228_catchScroll(navLinks) { var clickedSectionID = null; var sections = []; var sectionToNavigationLinkID = {}; var interval = 100; var lastCall; var timeoutID; navLinks = navLinks.reverse(); navLinks.forEach(function (link) { var currentSection = t228_getSectionByHref(link); if (currentSection && currentSection.id) { sections.push(currentSection); sectionToNavigationLinkID[currentSection.id] = link } }); sections.sort(function (a, b) { return b.getBoundingClientRect().top - a.getBoundingClientRect().top }); t228_highlightNavLinks(navLinks, sections, sectionToNavigationLinkID, clickedSectionID); navLinks.forEach(function (navLink, i) { navLink.addEventListener('click', function () { var clickedSection = t228_getSectionByHref(navLink); if (!navLink.classList.contains('tooltipstered') && clickedSection && clickedSection.id) { navLinks.forEach(function (link, index) { if (index === i) { link.classList.add('t-active') } else { link.classList.remove('t-active') } }); clickedSectionID = clickedSection.id } }) }); window.addEventListener('scroll', function () { var dateNow = new Date().getTime(); if (lastCall && dateNow < lastCall + interval) { clearTimeout(timeoutID); timeoutID = setTimeout(function () { lastCall = dateNow; clickedSectionID = t228_highlightNavLinks(navLinks, sections, sectionToNavigationLinkID, clickedSectionID) }, interval - (dateNow - lastCall)) } else { lastCall = dateNow; clickedSectionID = t228_highlightNavLinks(navLinks, sections, sectionToNavigationLinkID, clickedSectionID) } }) }
function t228_getSectionByHref(curlink) { if (!curlink) return; var curLinkValue = curlink.href ? curlink.href.replace(/\s+/g, '') : ''; if (curLinkValue.indexOf('/') === 0) curLinkValue = curLinkValue.slice(1); if (curlink.href && curlink.matches('[href*="#rec"]')) { curLinkValue = curLinkValue.replace(/.*#/, ''); return document.getElementById(curLinkValue) } else { var selector = curlink.href ? curlink.href : ''; if (selector.indexOf('#') === 0 || selector.indexOf('/') === 0) selector = selector.slice(1); var fullSelector = '.r[data-record-type="215"] a[name="' + selector + '"]'; return document.querySelector(fullSelector) } }
function t228_highlightNavLinks(navLinks, sections, sectionToNavigationLinkID, clickedSectionID) {
    var scrollPosition = window.pageYOffset; var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight); var returnValue = clickedSectionID; var lastSection = sections.length ? sections[sections.length - 1] : null; var lastSectionTopPos = lastSection ? lastSection.getAttribute('data-offset-top') : '0'; lastSectionTopPos = parseInt(lastSectionTopPos, 10) || 0; if (sections.length && clickedSectionID === null && lastSectionTopPos > (scrollPosition + 300)) { navLinks.forEach(function (link) { link.classList.remove('t-active') }); return null }
    for (var i = 0; i < sections.length; i++) {
        var sectionTopPos = sections[i].getBoundingClientRect().top + window.pageYOffset; var navLink = sections[i].id ? sectionToNavigationLinkID[sections[i].id] : null; if (scrollPosition + 300 >= sectionTopPos || i === 0 && scrollPosition >= scrollHeight - window.innerHeight) {
            if (clickedSectionID === null && navLink && !navLink.classList.contains('t-active')) { navLinks.forEach(function (link) { link.classList.remove('t-active') }); if (navLink) navLink.classList.add('t-active'); returnValue = null } else if (clickedSectionID !== null && sections[i].id && clickedSectionID === sections[i].id) { returnValue = null }
            break
        }
    }
    return returnValue
}
function t228_setWidth(recid) { var rec = document.getElementById('rec' + recid); if (!rec) return; var menuCenterSideList = rec.querySelectorAll('.t228__centerside'); Array.prototype.forEach.call(menuCenterSideList, function (menuCenterSide) { menuCenterSide.classList.remove('t228__centerside_hidden') }); if (window.innerWidth <= 980) return; var menuBlocks = rec.querySelectorAll('.t228'); Array.prototype.forEach.call(menuBlocks, function (menu) { var maxWidth; var centerWidth = 0; var paddingWidth = 40; var leftSide = menu.querySelector('.t228__leftside'); var rightSide = menu.querySelector('.t228__rightside'); var menuList = menu.querySelector('.t228__list'); var mainContainer = menu.querySelector('.t228__maincontainer'); var leftContainer = menu.querySelector('.t228__leftcontainer'); var rightContainer = menu.querySelector('.t228__rightcontainer'); var centerContainer = menu.querySelector('.t228__centercontainer'); var centerContainerLi = centerContainer ? centerContainer.querySelectorAll('li') : []; var leftContainerWidth = t228_getFullWidth(leftContainer); var rightContainerWidth = t228_getFullWidth(rightContainer); var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0; var dataAlign = menu.getAttribute('data-menu-items-align'); var isDataAlignCenter = dataAlign === 'center' || dataAlign === null; maxWidth = leftContainerWidth >= rightContainerWidth ? leftContainerWidth : rightContainerWidth; maxWidth = Math.ceil(maxWidth); Array.prototype.forEach.call(centerContainerLi, function (li) { centerWidth += t228_getFullWidth(li) }); if (mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) > centerWidth + 20) { if (isDataAlignCenter) { if (leftSide) leftSide.style.minWidth = maxWidth + 'px'; if (rightSide) rightSide.style.minWidth = maxWidth + 'px'; if (menuList) menuList.classList.remove('t228__list_hidden') } } else { if (leftSide) leftSide.style.minWidth = maxWidth + ''; if (rightSide) rightSide.style.minWidth = maxWidth + '' } }) }
function t228_getFullWidth(el) { if (!el) return 0; var marginLeft = el.style.marginLeft || window.getComputedStyle(el).marginLeft; var marginRight = el.style.marginRight || window.getComputedStyle(el).marginRight; marginLeft = parseInt(marginLeft, 10) || 0; marginRight = parseInt(marginRight, 10) || 0; return el.offsetWidth + marginLeft + marginRight }
function t228_getFullHeight(el) { if (!el) return 0; var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop; var marginBottom = el.style.marginBottom || window.getComputedStyle(el).marginBottom; marginTop = parseInt(marginTop, 10) || 0; marginBottom = parseInt(marginBottom, 10) || 0; return el.offsetHeight + marginTop + marginBottom }
function t228_setBg(recid) { var rec = document.getElementById('rec' + recid); if (!rec) return; var menuBlocks = rec.querySelectorAll('.t228'); Array.prototype.forEach.call(menuBlocks, function (menu) { if (window.innerWidth > 980) { if (menu.getAttribute('data-bgcolor-setbyscript') === 'yes') { menu.style.backgroundColor = menu.getAttribute('data-bgcolor-rgba') } } else { menu.style.backgroundColor = menu.getAttribute('data-bgcolor-hex'); menu.setAttribute('data-bgcolor-setbyscript', 'yes'); if (menu.style.transform) menu.style.transform = ''; if (menu.style.opacity) menu.style.opacity = '' } }) }
function t228_appearMenu(recid) {
    if (window.innerWidth <= 980) return; var rec = document.getElementById('rec' + recid); if (!rec) return !1; var menuBlocks = rec.querySelectorAll('.t228'); Array.prototype.forEach.call(menuBlocks, function (menu) {
        var appearOffset = menu.getAttribute('data-appearoffset'); if (appearOffset) {
            if (appearOffset.indexOf('vh') !== -1) { appearOffset = Math.floor((window.innerHeight * (parseInt(appearOffset) / 100))) }
            appearOffset = parseInt(appearOffset, 10); var menuHeight = menu.clientHeight; if (typeof appearOffset === 'number' && window.pageYOffset >= appearOffset) { if (menu.style.transform === 'translateY(-' + menuHeight + 'px)') { t228_slideUpElement(menu, menuHeight, 'toBottom') } } else if (menu.style.transform === 'translateY(0px)') { t228_slideUpElement(menu, menuHeight, 'toTop') } else { menu.style.transform = 'translateY(-' + menuHeight + 'px)'; menu.style.opacity = '0' }
        }
    })
}
function t228_changebgopacitymenu(recid) { if (window.innerWidth <= 980) return; var rec = document.getElementById('rec' + recid); if (!rec) return; var menuBlocks = rec.querySelectorAll('.t228'); Array.prototype.forEach.call(menuBlocks, function (menu) { var bgColor = menu.getAttribute('data-bgcolor-rgba'); var bgColorAfterScroll = menu.getAttribute('data-bgcolor-rgba-afterscroll'); var bgOpacity = menu.getAttribute('data-bgopacity'); var bgOpacityTwo = menu.getAttribute('data-bgopacity-two'); var menuShadow = menu.getAttribute('data-menushadow') || '0'; var menuShadowValue = menuShadow === '100' ? menuShadow : '0.' + menuShadow; menu.style.backgroundColor = window.pageYOffset > 20 ? bgColorAfterScroll : bgColor; if (window.pageYOffset > 20 && bgOpacityTwo === '0' || window.pageYOffset <= 20 && bgOpacity === '0.0' || menuShadow === ' ') { menu.style.boxShadow = 'none' } else { menu.style.boxShadow = '0px 1px 3px rgba(0,0,0,' + menuShadowValue + ')' } }) }
function t228_createMobileMenu(recid) {
    var rec = document.getElementById('rec' + recid); if (!rec) return; var menu = rec.querySelector('.t228'); var burger = rec.querySelector('.t228__mobile'); if (burger) { burger.addEventListener('click', function () { if (burger.classList.contains('t228_opened')) { t228_fadeOut(menu, 300); burger.classList.remove('t228_opened') } else { t228_fadeIn(menu, 300, function () { if (menu.style.transform) menu.style.transform = ''; if (menu.style.opacity) menu.style.opacity = '' }); burger.classList.add('t228_opened') } }) }
    window.addEventListener('resize', t_throttle(function () { if (window.innerWidth > 980) { if (menu.style.opacity) menu.style.opacity = ''; if (menu.style.display === 'none') menu.style.display = '' } else if (menu.style.transform) menu.style.transform = '' }))
}
function t228_fadeOut(element, duration, callback) {
    if (!element) return !1; var opacity = 1; duration = parseInt(duration, 10); var speed = duration > 0 ? duration / 10 : 40; var timer = setInterval(function () {
        element.style.opacity = opacity; opacity -= 0.1; if (opacity <= 0.1) {
            element.style.opacity = '0'; element.style.display = 'none'; if (typeof callback === 'function') { callback() }
            clearInterval(timer)
        }
    }, speed)
}
function t228_fadeIn(element, duration, callback) {
    if (!element) return !1; if ((getComputedStyle(element).opacity === '1' || getComputedStyle(element).opacity === '') && getComputedStyle(element).display !== 'none') return !1; var opacity = 0; duration = parseInt(duration, 10); var speed = duration > 0 ? duration / 10 : 40; element.style.opacity = opacity; element.style.display = 'block'; var timer = setInterval(function () {
        element.style.opacity = opacity; opacity += 0.1; if (opacity >= 1) {
            element.style.opacity = '1'; if (typeof callback === 'function') { callback() }
            clearInterval(timer)
        }
    }, speed)
}
function t228_slideUpElement(menu, menuHeight, position) {
    var diff = position === 'toTop' ? 0 : menuHeight; var diffOpacity = position === 'toTop' ? 1 : 0; var timerID = setInterval(function () {
        menu.style.transform = 'translateY(-' + diff + 'px)'; menu.style.opacity = diffOpacity.toString(); diffOpacity = position === 'toTop' ? diffOpacity - 0.1 : diffOpacity + 0.1; diff = position === 'toTop' ? diff + (menuHeight / 20) : diff - (menuHeight / 20); if (position === 'toTop' && diff >= menuHeight) { menu.style.transform = 'translateY(-' + menuHeight + 'px)'; menu.style.opacity = '0'; clearInterval(timerID) }
        if (position === 'toBottom' && diff <= 0) { menu.style.transform = 'translateY(0px)'; menu.style.opacity = '1'; clearInterval(timerID) }
    }, 10)
}
function t270_scroll(hash, offset, speed) {
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) { return !0 }
    var root = $('html, body'); var target = ""; if (speed === undefined) { speed = 400 }
    try { target = $(hash) } catch (event) { console.log("Exception t270: " + event.message); return !0 }
    if (target.length === 0) { target = $('a[name="' + hash.substr(1) + '"]'); if (target.length === 0) { return !0 } }
    var isHistoryChangeAllowed = window.location.hash !== hash; var complete = function () {
        if (!isHistoryChangeAllowed) { return }
        if (history.pushState) { history.pushState(null, null, hash) } else { window.location.hash = hash }
        isHistoryChangeAllowed = !1
    }
    var dontChangeHistory = Boolean($('.t270').attr('data-history-disabled')); if (dontChangeHistory) { complete = function () { } }
    root.animate({ scrollTop: target.offset().top - offset }, speed, complete); return !0
}
function t280_showMenu(recid) {
    var el = $("#rec" + recid); el.find('.t280__burger, .t280__menu__bg, .t280__menu__item:not(".tooltipstered"):not(".t280__menu__item_submenu"), .t978__tooltip-menu_mobile').click(function (e) {
        if ($(this).is(".t280__menu__item.tooltipstered, .t794__tm-link")) { return }
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); var menuItemsLength = el.find('.t280__menu__item').length; var isAndroid = /(android)/i.test(navigator.userAgent); if (window.location.hash && isChrome && menuItemsLength > 10 && isAndroid) { setTimeout(function () { var hash = window.location.hash; window.location.hash = ""; window.location.hash = hash }, 50) }
        if (!$(this).is(".t978__tm-link, .t966__tm-link")) { $('body').toggleClass('t280_opened'); el.find('.t280').toggleClass('t280__main_opened') }
        t280_changeSize(recid); t280_highlight(recid); el.find(".t978__tm-link, .t966__tm-link, .t-menusub__target-link").click(function () { t280_changeSize(recid); el.find(".t280__menu").css('transition', 'none'); el.find(".t978__menu-link").click(function () { t280_changeSize(recid) }) })
    }); $('.t280').bind('clickedAnchorInTooltipMenu', function () { $('body').removeClass('t280_opened'); el.find('.t280').removeClass('t280__main_opened') }); if (el.find('.t-menusub__link-item')) { el.find('.t-menusub__link-item').on('click', function () { $('body').removeClass('t280_opened'); el.find('.t280').removeClass('t280__main_opened') }) }
}
function t280_changeSize(recid) {
    var el = $("#rec" + recid); var div = el.find(".t280__menu").height(); var bottomheight = el.find(".t280__bottom").height(); var headerheight = el.find(".t280__container").height(); var wrapper = el.find(".t280__menu__wrapper"); var win = $(window).height() - bottomheight - headerheight - 160; if (div > win) { wrapper.addClass('t280__menu_static') }
    else { wrapper.removeClass('t280__menu_static') }
}
function t280_changeBgOpacityMenu(recid) { var window_width = $(window).width(); var record = $("#rec" + recid); record.find(".t280__container__bg").each(function () { var el = $(this); var bgcolor = el.attr("data-bgcolor-rgba"); var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll"); var bgopacity = el.attr("data-bgopacity"); var bgopacity_afterscroll = el.attr("data-bgopacity2"); var menu_shadow = el.attr("data-menu-shadow"); if ($(window).scrollTop() > 20) { el.css("background-color", bgcolor_afterscroll); if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") { el.css('box-shadow', menu_shadow) } else { el.css('box-shadow', 'none') } } else { el.css("background-color", bgcolor); if (bgopacity != "0" && bgopacity != "0.0") { el.css('box-shadow', menu_shadow) } else { el.css('box-shadow', 'none') } } }) }
function t280_appearMenu() {
    $('.t280').each(function () {
        var el = $(this); var appearoffset = el.attr('data-appearoffset'); if (appearoffset != '') {
            if (appearoffset.indexOf('vh') > -1) { appearoffset = Math.floor(window.innerHeight * (parseInt(appearoffset) / 100)) }
            appearoffset = parseInt(appearoffset, 10); if ($(window).scrollTop() >= appearoffset) { if (el.css('visibility') == 'hidden') { el.finish(); el.css('top', '-50px'); el.css('opacity', '1'); el.css('visibility', 'visible') } } else { el.stop(); el.css('opacity', '0'); el.css('visibility', 'hidden') }
        }
    })
}
function t280_highlight(recid) {
    var url = window.location.href; var pathname = window.location.pathname; var hash = window.location.hash; if (url.substr(url.length - 1) == "/") { url = url.slice(0, -1) }
    if (pathname.substr(pathname.length - 1) == "/") { pathname = pathname.slice(0, -1) }
    if (pathname.charAt(0) == "/") { pathname = pathname.slice(1) }
    if (pathname == "") { pathname = "/" }
    if (hash.substr(hash.length - 1) == "/") { hash = hash.slice(0, -1) }
    $("#rec" + recid).find(".t280__menu a").removeClass("t-active"); $(".t280__menu a[href='" + url + "']").addClass("t-active"); $(".t280__menu a[href='" + url + "/']").addClass("t-active"); $(".t280__menu a[href='" + pathname + "']").addClass("t-active"); $(".t280__menu a[href='/" + pathname + "']").addClass("t-active"); $(".t280__menu a[href='" + pathname + "/']").addClass("t-active"); $(".t280__menu a[href='/" + pathname + "/']").addClass("t-active"); if (hash !== "") { $(".t280__menu a[href='" + hash + "']").addClass("t-active"); $(".t280__menu a[href='/" + hash + "']").addClass("t-active"); $(".t280__menu a[href='" + hash + "/']").addClass("t-active"); $(".t280__menu a[href='/" + hash + "/']").addClass("t-active") }
}
function t396_init(recid) {
    var data = ''; var resolution = t396_detectResolution(); var allRecords = document.getElementById('allrecords'); var record = document.getElementById('rec' + recid); var zeroBlock = record ? record.querySelector('.t396') : null; var artBoard = record ? record.querySelector('.t396__artboard') : null; window.tn_window_width = document.documentElement.clientWidth; window.tn_scale_factor = Math.round((window.tn_window_width / resolution) * 100) / 100; t396_initTNobj(); t396_switchResolution(resolution); t396_updateTNobj(); t396_artboard_build(data, recid); window.addEventListener('resize', function () { tn_console('>>>> t396: Window on Resize event >>>>'); t396_waitForFinalEvent(function () { if (window.isMobile) { if (document.documentElement.clientWidth !== window.tn_window_width) { t396_doResize(recid) } } else { t396_doResize(recid) } }, 500, 'resizeruniqueid' + recid) }); window.addEventListener('orientationchange', function () { tn_console('>>>> t396: Orient change event >>>>'); t396_waitForFinalEvent(function () { t396_doResize(recid) }, 600, 'orientationuniqueid' + recid) }); window.addEventListener('load', function () {
        t396_allelems__renderView(artBoard); var blockOverflow = artBoard ? window.getComputedStyle(artBoard).getPropertyValue('overflow') : ''; if (typeof t_lazyload_update === 'function' && blockOverflow === 'auto' && artBoard) { artBoard.addEventListener('scroll', t_throttle(function () { var dataLazy = allRecords ? allRecords.getAttribute('data-tilda-lazy') : null; if (window.lazy === 'y' || dataLazy === 'yes') { t_onFuncLoad('t_lazyload_update', function () { t_lazyload_update() }) } }, 500)) }
        if (window.location.hash !== '' && blockOverflow === 'visible') { if (artBoard) artBoard.style.overflow = 'hidden'; setTimeout(function () { if (artBoard) artBoard.style.overflow = 'visible' }, 1) }
    }); if (record && zeroBlock && artBoard && record.getAttribute('data-connect-with-tab') === 'yes') { zeroBlock.addEventListener('displayChanged', function () { t396_allelems__renderView(artBoard) }) }
    if (window.isSafari && zeroBlock) { zeroBlock.classList.add('t396_safari') }
    var isScaled = t396_ab__getFieldValue(artBoard, 'upscale') === 'window'; var isTildaModeEdit = allRecords ? allRecords.getAttribute('data-tilda-mode') === 'edit' : null; if (isScaled && !isTildaModeEdit) t396_scaleBlock(recid)
}
function t396_isOnlyScalableBrowser() { var isFirefox = navigator.userAgent.search('Firefox') !== -1; var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') !== -1; return isFirefox || isOpera }
function t396_scaleBlock(recid) {
    var isOnlyScalable = t396_isOnlyScalableBrowser(); var resolution = t396_detectResolution(); var record = document.getElementById('rec' + recid); var zeroBlockElements = record ? record.querySelectorAll('.t396__elem') : []; var artBoard = record ? record.querySelector('.t396__artboard') : null; if (artBoard) {
        var artBoardWidth = artBoard.clientWidth; var updatedBlockHeight = Math.floor(artBoard.clientHeight * window.tn_scale_factor); var artBoardHeightVH = t396_ab__getFieldValue(artBoard, 'height_vh'); window.tn_scale_offset = (artBoardWidth * window.tn_scale_factor - artBoardWidth) / 2; if (artBoardHeightVH) { var artBoardMinHeight = t396_ab__getFieldValue(artBoard, 'height'); var artBoardMaxHeight = t396_ab__getHeight(artBoard); var scaledMinHeight = artBoardMinHeight * window.tn_scale_factor; updatedBlockHeight = (scaledMinHeight >= artBoardMaxHeight) ? scaledMinHeight : artBoardMaxHeight }
        artBoard.classList.add('t396__artboard_scale'); var styleStr = '<style class="t396__scale-style">' + '.t-rec#rec' + recid + ' { overflow: visible; }' + '#rec' + recid + ' .t396__carrier,' + '#rec' + recid + ' .t396__filter,' + '#rec' + recid + ' .t396__artboard {' + 'height: ' + updatedBlockHeight + 'px !important;' + 'width: 100vw !important;' + 'max-width: 100%;' + '}' + '</style>'; artBoard.insertAdjacentHTML('beforeend', styleStr)
    }
    Array.prototype.forEach.call(zeroBlockElements, function (zeroBlockElement) {
        var atom = zeroBlockElement.querySelector('.tn-atom'); var containerProp = t396_elem__getFieldValue(zeroBlockElement, 'container'); if (containerProp === 'grid') {
            if (isOnlyScalable) { if (atom) { var atomParent = atom.parentNode; var div = document.createElement('div'); div.classList.add('tn-atom__scale-wrapper'); div.style.transform = 'scale(' + window.tn_scale_factor + ')'; if (atomParent) atomParent.removeChild(atom); div.appendChild(atom); if (atomParent) atomParent.appendChild(div) } } else {
                zeroBlockElement.style.zoom = window.tn_scale_factor; if (zeroBlockElement.getAttribute('data-elem-type') === 'text' && resolution < 1200 && atom) { atom.style.webkitTextSizeAdjust = 'auto' }
                if (atom) atom.style.transformOrigin = 'center'
            }
        }
    })
}
function t396_doResize(recid) {
    var isOnlyScalable = t396_isOnlyScalableBrowser(); var record = document.getElementById('rec' + recid); var allRecords = document.getElementById('allrecords'); var resolution = t396_detectResolution(); var scaleStyle = record ? record.querySelector('.t396__scale-style') : null; t396_removeElementFromDOM(scaleStyle); if (!isOnlyScalable) { var elements = record ? record.querySelectorAll('.t396__elem') : []; Array.prototype.forEach.call(elements, function (element) { element.style.zoom = ''; var atom = element.querySelector('.tn-atom'); if (atom) atom.style.transformOrigin = '' }) } else { var atoms = record.querySelectorAll('.tn-atom'); Array.prototype.forEach.call(atoms, function (atom) { var atomWrapper = atom.closest('.tn-atom__scale-wrapper'); var atomParent = atomWrapper ? atomWrapper.parentNode : null; if (atomParent) atomParent.removeChild(atomWrapper); if (atomParent) atomParent.appendChild(atom) }) }
    var artBoard = record ? record.querySelector('.t396__artboard') : null; var artBoardWidth = artBoard ? artBoard.clientWidth : 0; window.tn_window_width = window.isMobile ? document.documentElement.clientWidth : window.innerWidth; window.tn_scale_factor = Math.round((window.tn_window_width / resolution) * 100) / 100; window.tn_scale_offset = (artBoardWidth * window.tn_scale_factor - artBoardWidth) / 2; t396_switchResolution(resolution); t396_updateTNobj(); t396_ab__renderView(artBoard); t396_allelems__renderView(artBoard); var tildaMode = allRecords ? allRecords.getAttribute('data-tilda-mode') : ''; var isScaled = t396_ab__getFieldValue(artBoard, 'upscale') === 'window'; if (isScaled && tildaMode !== 'edit') t396_scaleBlock(recid)
}
function t396_detectResolution() {
    var windowWidth = window.isMobile ? document.documentElement.clientWidth : window.innerWidth; var resolution = 1200; var breakpoints = [1200, 960, 640, 480, 320]; for (var i = 0; i < breakpoints.length - 1; i++) { if (windowWidth < breakpoints[i]) { resolution = breakpoints[i + 1] } }
    return resolution
}
function t396_initTNobj() { tn_console('func: initTNobj'); window.tn = {}; window.tn.canvas_min_sizes = ['320', '480', '640', '960', '1200']; window.tn.canvas_max_sizes = ['480', '640', '960', '1200', '']; window.tn.ab_fields = ['height', 'width', 'bgcolor', 'bgimg', 'bgattachment', 'bgposition', 'filteropacity', 'filtercolor', 'filteropacity2', 'filtercolor2', 'height_vh', 'valign'] }
function t396_updateTNobj() {
    tn_console('func: updateTNobj'); var allRecords = document.getElementById('allrecords'); var allRecPaddingLeft = allRecords ? window.getComputedStyle(allRecords).paddingLeft || '0' : '0'; allRecPaddingLeft = parseInt(allRecPaddingLeft, 10); var allRecPaddingRight = allRecords ? window.getComputedStyle(allRecords).paddingRight || '0' : '0'; allRecPaddingRight = parseInt(allRecPaddingRight, 10); if (window.zero_window_width_hook && window.zero_window_width_hook === 'allrecords' && allRecords) { window.tn.window_width = allRecords.clientWidth - (allRecPaddingLeft + allRecPaddingRight) } else { window.tn.window_width = document.documentElement.clientWidth }
    window.tn.window_height = document.documentElement.clientHeight; window.tn.curResolution; var breakpoints = [1200, 960, 640, 480, 320]; for (var i = 0; i < breakpoints.length; i++) { if (+window.tn.curResolution === breakpoints[i]) { window.tn.canvas_min_width = breakpoints[i]; window.tn.canvas_max_width = i === 0 ? window.tn.window_width : breakpoints[i - 1] } }
    window.tn.grid_width = window.tn.canvas_min_width; window.tn.grid_offset_left = (window.tn.window_width - window.tn.grid_width) / 2
}
var t396_waitForFinalEvent = (function () {
    var timers = {}; return function (callback, ms, uniqueId) {
        if (!uniqueId) { uniqueId = 'Don\'t call this twice without a uniqueId' }
        if (timers[uniqueId]) { clearTimeout(timers[uniqueId]) }
        timers[uniqueId] = setTimeout(callback, ms)
    }
})(); function t396_switchResolution(resolution, resolutionMax) {
    tn_console('func: switchResolution'); if (typeof resolutionMax === 'undefined') { var breakpoints = [1200, 960, 640, 480, 320]; breakpoints.forEach(function (breakpoint, i) { if (+resolution === breakpoint) { resolutionMax = i === 0 ? '' : breakpoints[i - 1] } }) }
    window.tn.curResolution = resolution; window.tn.curResolution_max = resolutionMax
}
function t396_artboard_build(data, recid) {
    tn_console('func: t396_artboard_build. Recid:' + recid); tn_console(data); var record = document.getElementById('rec' + recid); var allRecords = document.getElementById('allrecords'); var artBoard = record ? record.querySelector('.t396__artboard') : null; if (!artBoard) return !1; t396_ab__renderView(artBoard); var elements = artBoard.querySelectorAll('.tn-elem'); Array.prototype.forEach.call(elements, function (element) { var dataType = element.getAttribute('data-elem-type'); switch (dataType) { case 'text': t396_addText(artBoard, element); break; case 'image': t396_addImage(artBoard, element); break; case 'shape': t396_addShape(artBoard, element); break; case 'button': t396_addButton(artBoard, element); break; case 'video': t396_addVideo(artBoard, element); break; case 'html': t396_addHtml(artBoard, element); break; case 'tooltip': t396_addTooltip(artBoard, element); break; case 'form': t396_addForm(artBoard, element); break; case 'gallery': t396_addGallery(artBoard, element); break } }); artBoard.classList.remove('rendering'); artBoard.classList.add('rendered'); var artBoardOverflow = artBoard.getAttribute('data-artboard-ovrflw'); if ((artBoardOverflow === 'visible' || artBoardOverflow === 'visibleX') && allRecords) { allRecords.style.overflow = 'hidden' }
    if (window.isMobile) { var style = document.createElement('style'); style.textContent = '@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}'; record.insertAdjacentElement('beforeend', style) }
}
function t396_ab__renderView(artBoard) {
    if (!artBoard) return !1; var fields = window.tn.ab_fields; var allRecords = document.getElementById('allrecords'); var artBoardHeightVH; for (var i = 0; i < fields.length; i++) { t396_ab__renderViewOneField(artBoard, fields[i]) }
    var artBoardMinHeight = t396_ab__getFieldValue(artBoard, 'height'); var artBoardMaxHeight = t396_ab__getHeight(artBoard); var isTildaModeEdit = allRecords ? allRecords.getAttribute('data-tilda-mode') === 'edit' : !1; var isScaled = t396_ab__getFieldValue(artBoard, 'upscale') === 'window'; artBoardHeightVH = t396_ab__getFieldValue(artBoard, 'height_vh'); if (isScaled && !isTildaModeEdit && artBoardHeightVH) { var scaledMinHeight = parseInt(artBoardMinHeight, 10) * window.tn_scale_factor }
    var offsetTop; if (artBoardMinHeight === artBoardMaxHeight || (scaledMinHeight && scaledMinHeight >= artBoardMaxHeight)) { offsetTop = 0 } else {
        var artBoardVerticalAlign = t396_ab__getFieldValue(artBoard, 'valign'); switch (artBoardVerticalAlign) {
            case 'top': offsetTop = 0; break; case 'center': if (scaledMinHeight) { offsetTop = parseFloat(((artBoardMaxHeight - scaledMinHeight) / 2).toFixed(1)) } else { offsetTop = parseFloat(((artBoardMaxHeight - artBoardMinHeight) / 2).toFixed(1)) }
                break; case 'bottom': if (scaledMinHeight) { offsetTop = parseFloat((artBoardMaxHeight - scaledMinHeight).toFixed(1)) } else { offsetTop = parseFloat((artBoardMaxHeight - artBoardMinHeight).toFixed(1)) }
                break; case 'stretch': offsetTop = 0; artBoardMinHeight = artBoardMaxHeight; break; default: offsetTop = 0; break
        }
    }
    artBoard.setAttribute('data-artboard-proxy-min-offset-top', offsetTop); artBoard.setAttribute('data-artboard-proxy-min-height', artBoardMinHeight); artBoard.setAttribute('data-artboard-proxy-max-height', artBoardMaxHeight); var filter = artBoard.querySelector('.t396__filter'); var carrier = artBoard.querySelector('.t396__carrier'); artBoardHeightVH = t396_ab__getFieldValue(artBoard, 'height_vh'); artBoardHeightVH = parseFloat(artBoardHeightVH); if (window.isMobile && artBoardHeightVH) { var height = document.documentElement.clientHeight * artBoardHeightVH / 100; artBoard.style.height = height + 'px'; if (filter) filter.style.height = height + 'px'; if (carrier) carrier.style.height = height + 'px' }
}
function t396_addText(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addText'); var fieldsString = 'top,left,width,container,axisx,axisy,widthunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element) }
function t396_addImage(artBoard, element) {
    element = t396_getEl(element); if (!element) return; tn_console('func: addImage'); var fieldsString = 'img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element); var images = element.querySelectorAll('img'); Array.prototype.forEach.call(images, function (img) {
        img.addEventListener('load', function () { t396_elem__renderViewOneField(element, 'top'); if (img.src) { setTimeout(function () { t396_elem__renderViewOneField(element, 'top') }, 2000) } }); if (img.complete) { t396_elem__renderViewOneField(element, 'top'); if (img.src) { setTimeout(function () { t396_elem__renderViewOneField(element, 'top') }, 2000) } }
        img.addEventListener('tuwidget_done', function () { t396_elem__renderViewOneField(element, 'top') })
    })
}
function t396_addShape(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addShape'); var fieldsString = 'width,height,top,left,'; fieldsString += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element) }
function t396_addButton(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addButton'); var fieldsString = 'top,left,width,height,container,axisx,axisy,caption,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element); return (element) }
function t396_addVideo(artBoard, element) {
    element = t396_getEl(element); if (!element) return; tn_console('func: addVideo'); var fieldsString = 'width,height,top,left,'; fieldsString += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element); var videoEl = element.querySelector('.tn-atom__videoiframe'); var atom = element.querySelector('.tn-atom'); if (atom) atom.style.backgroundColor = '#000'; var videoCover = atom ? atom.getAttribute('data-atom-video-has-cover') : ''; if (!videoCover) videoCover = ''; if (videoCover === 'y' && atom) { atom.addEventListener('click', function () { var iframe = videoEl ? videoEl.querySelector('iframe') : null; var dataOriginal = iframe ? iframe.getAttribute('data-original') : ''; if (iframe) iframe.setAttribute('src', dataOriginal); atom.style.backgroundImage = 'none'; var playBtn = atom.querySelector('.tn-atom__video-play-link'); if (playBtn) playBtn.style.display = 'none' }) }
    var allRecords = document.getElementById('allrecords'); var autoplay = t396_elem__getFieldValue(element, 'autoplay'); var showinfo = t396_elem__getFieldValue(element, 'showinfo'); var loop = t396_elem__getFieldValue(element, 'loop'); var mute = t396_elem__getFieldValue(element, 'mute'); var startSec = t396_elem__getFieldValue(element, 'startsec'); var endSec = t396_elem__getFieldValue(element, 'endsec'); var tildaMode = allRecords ? allRecords.getAttribute('data-tilda-mode') : ''; var url = ''; var script = document.createElement('script'); script.textContent = 'lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});'; var youtubeID = videoEl ? videoEl.getAttribute('data-youtubeid') : ''; if (youtubeID) {
        url = '//youtube.com/embed/'; url += youtubeID + '?rel=0&fmt=18&html5=1'; url += '&showinfo=' + (showinfo === 'y' ? '1' : '0'); if (loop === 'y') { url += '&loop=1&playlist=' + youtubeID }
        if (startSec > 0) { url += '&start=' + startSec }
        if (endSec > 0) { url += '&end=' + endSec }
        if (mute === 'y') { url += '&mute=1' }
        if (videoCover === 'y') {
            url += '&autoplay=1'; var instFlag = 'y'; var iframeClass = ''; if (autoplay === 'y' && mute === 'y' && window.lazy === 'y') { instFlag = 'lazy'; iframeClass = ' class="t-iframe"' }
            videoEl.innerHTML = '<iframe id="youtubeiframe"' + iframeClass + ' width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="' + instFlag + '"></iframe>'; if (autoplay === 'y' && mute === 'y' && window.lazy === 'y') { element.insertAdjacentElement('beforeend', script) }
            if (autoplay === 'y' && mute === 'y') { atom.click() }
        } else {
            if (tildaMode !== 'edit' && autoplay === 'y') { url += '&autoplay=1' }
            if (window.lazy === 'y') { videoEl.innerHTML = '<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'; element.insertAdjacentElement('beforeend', script) } else { videoEl.innerHTML = '<iframe id="youtubeiframe" width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>' }
        }
    }
    var vimeoID = videoEl ? videoEl.getAttribute('data-vimeoid') : ''; if (vimeoID) {
        url = '//player.vimeo.com/video/'; url += vimeoID + '?color=ffffff&badge=0'; if (showinfo === 'y') { url += '&title=1&byline=1&portrait=1' } else { url += '&title=0&byline=0&portrait=0' }
        if (loop === 'y') { url += '&loop=1' }
        if (mute === 'y') { url += '&muted=1' }
        if (videoCover === 'y') { url += '&autoplay=1'; videoEl.innerHTML = '<iframe data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' } else {
            if (tildaMode !== 'edit' && autoplay === 'y') { url += '&autoplay=1' }
            if (window.lazy === 'y') { videoEl.innerHTML = '<iframe class="t-iframe" data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'; element.insertAdjacentElement('beforeend', script) } else { videoEl.innerHTML = '<iframe src="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' }
        }
    }
}
function t396_addHtml(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addHtml'); var fieldsString = 'width,height,top,left,'; fieldsString += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element) }
function t396_addTooltip(artBoard, element) {
    element = t396_getEl(element); if (!element) return; tn_console('func: addTooltip'); var fieldsString = 'width,height,top,left,'; fieldsString += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element); var tooltip = element.querySelector('.tn-atom__pin'); var tooltipContent = element.querySelector('.tn-atom__tip'); var tooltipOpenTrigger = element.getAttribute('data-field-tipopen-value'); if (window.isMobile || tooltipOpenTrigger === 'click') { t396_setUpTooltip_mobile(element, tooltip, tooltipContent) } else { t396_setUpTooltip_desktop(element, tooltip, tooltipContent) }
    setTimeout(function () { var atomImages = document.querySelectorAll('.tn-atom__tip-img'); Array.prototype.forEach.call(atomImages, function (img) { var imgOriginal = img.getAttribute('data-tipimg-original'); if (imgOriginal) img.src = imgOriginal }) }, 3000)
}
function t396_addForm(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addForm'); var fieldsString = 'width,top,left,'; fieldsString += 'inputs,container,axisx,axisy,widthunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element) }
function t396_addGallery(artBoard, element) { element = t396_getEl(element); if (!element) return; tn_console('func: addForm'); var fieldsString = 'width,height,top,left,'; fieldsString += 'imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits'; element.setAttribute('data-fields', fieldsString); t396_elem__renderView(element) }
function t396_elem__setFieldValue(element, prop, val, flag_render, flag_updateui, resolution) {
    element = t396_getEl(element); if (!element) return; if (!resolution) resolution = window.tn.curResolution; if (+resolution < 1200 && prop !== 'zindex') { element.setAttribute('data-field-' + prop + '-res-' + resolution + '-value', val) } else { element.setAttribute('data-field-' + prop + '-value', val) }
    if (flag_render === 'render') elem__renderViewOneField(element, prop); if (flag_updateui === 'updateui') panelSettings__updateUi(element, prop, val)
}
function t396_elem__getFieldValue(element, prop) {
    element = t396_getEl(element); if (!element) return; var resolution = window.tn.curResolution; var breakpoints = [1200, 960, 640, 480, 320]; var dataField; breakpoints.forEach(function (breakpoint, i) {
        if (i === 0 && +resolution >= breakpoint) { dataField = element.getAttribute('data-field-' + prop + '-value') }
        if (i > 0 && +resolution === breakpoint) {
            dataField = element.getAttribute('data-field-' + prop + '-res-' + breakpoint + '-value'); if (i > 1 && !dataField) { var slicedBreakpoints = breakpoints.slice(1, i); for (var n = slicedBreakpoints.length - 1; n >= 0; n--) { dataField = element.getAttribute('data-field-' + prop + '-res-' + slicedBreakpoints[n] + '-value'); if (dataField) break } }
            if (!dataField) dataField = element.getAttribute('data-field-' + prop + '-value')
        }
    }); return dataField ? dataField : ''
}
function t396_elem__renderView(element) { element = t396_getEl(element); tn_console('func: elem__renderView'); var fields = element ? element.getAttribute('data-fields') : ''; if (!fields) return !1; fields = fields.split(','); fields.forEach(function (field) { t396_elem__renderViewOneField(element, field) }) }
function t396_elem__renderViewOneField(element, field) {
    element = t396_getEl(element); if (!element) return; var value = t396_elem__getFieldValue(element, field); var elementType; var borderWidth; var borderStyle; var currentValue; var slidesMain; var slidesImg; switch (field) {
        case 'left': value = t396_elem__convertPosition__Local__toAbsolute(element, field, value); element.style.left = parseFloat(value).toFixed(1) + 'px'; break; case 'top': value = t396_elem__convertPosition__Local__toAbsolute(element, field, value); element.style.top = parseFloat(value).toFixed(1) + 'px'; break; case 'width': value = t396_elem__getWidth(element, value); element.style.width = parseFloat(value).toFixed(1) + 'px'; elementType = element.getAttribute('data-elem-type'); switch (elementType) {
            case 'tooltip': var pinSvgIcon = element.querySelectorAll('.tn-atom__pin-icon'); Array.prototype.forEach.call(pinSvgIcon, function (pin) { var pinSize = parseFloat(value).toFixed(1) + 'px'; pin.style.width = pinSize; pin.style.height = pinSize }); element.style.height = parseInt(value).toFixed(1) + 'px'; break; case 'gallery': borderWidth = t396_elem__getFieldValue(element, 'borderwidth'); borderStyle = t396_elem__getFieldValue(element, 'borderstyle'); if (!borderStyle || !borderWidth || borderStyle === 'none') { borderWidth = 0 }
                value -= borderWidth * 2; currentValue = parseFloat(value).toFixed(1) + 'px'; slidesMain = element.querySelector('.t-slds__main'); slidesImg = element.querySelectorAll('.tn-atom__slds-img'); element.style.width = currentValue; if (slidesMain) slidesMain.style.width = currentValue; Array.prototype.forEach.call(slidesImg, function (img) { img.style.width = currentValue }); break
        }
            break; case 'height': elementType = element.getAttribute('data-elem-type'); if (elementType === 'tooltip') return; value = t396_elem__getHeight(element, value); element.style.height = parseFloat(value).toFixed(1) + 'px'; if (elementType === 'gallery') {
                borderWidth = t396_elem__getFieldValue(element, 'borderwidth'); borderStyle = t396_elem__getFieldValue(element, 'borderstyle'); if (!borderStyle || !borderWidth || borderStyle === 'none') { borderWidth = 0 }
                value -= borderWidth * 2; currentValue = parseFloat(value).toFixed(1) + 'px'; slidesMain = element.querySelector('.t-slds__main'); slidesImg = element.querySelectorAll('.tn-atom__slds-img'); element.style.height = currentValue; if (slidesMain) slidesMain.style.height = currentValue; Array.prototype.forEach.call(slidesImg, function (img) { img.style.height = currentValue })
            }
            break; case 'container': t396_elem__renderViewOneField(element, 'left'); t396_elem__renderViewOneField(element, 'top'); break; case 'inputs': var textArea = element.querySelector('.tn-atom__inputs-textarea'); value = textArea ? textArea.value : ''; try { t_zeroForms__renderForm($(element), value) } catch (err) { }
            break
    }
    if (field === 'width' || field === 'height' || field === 'fontsize' || field === 'fontfamily' || field === 'letterspacing' || field === 'fontweight' || field === 'img') { t396_elem__renderViewOneField(element, 'left'); t396_elem__renderViewOneField(element, 'top') }
}
function t396_elem__convertPosition__Local__toAbsolute(element, field, value) {
    element = t396_getEl(element); if (!element) return; var artBoard = element.closest('.t396__artboard'); var verticalAlignValue = t396_ab__getFieldValue(artBoard, 'valign'); var isScaled = t396_ab__getFieldValue(artBoard, 'upscale') === 'window'; var allRecords = document.getElementById('allrecords'); var tildaMode = allRecords ? allRecords.getAttribute('data-tilda-mode') : ''; var isTildaModeEdit = tildaMode === 'edit'; var isOnlyScalable = t396_isOnlyScalableBrowser(); var isScaledElement = !isTildaModeEdit && isScaled && isOnlyScalable; var isZoomedElement = !isTildaModeEdit && isScaled && !isOnlyScalable; var valueAxisY = t396_elem__getFieldValue(element, 'axisy'); var valueAxisX = t396_elem__getFieldValue(element, 'axisx'); var container = t396_elem__getFieldValue(element, 'container'); value = parseInt(value); var elementContainer; var offsetLeft; var offsetTop; var elementWidth; var elementContainerWidth; var elementHeight; var elementContainerHeight; switch (field) {
        case 'left': elementContainer = container === 'grid' ? 'grid' : 'window'; offsetLeft = container === 'grid' ? window.tn.grid_offset_left : 0; elementContainerWidth = container === 'grid' ? window.tn.grid_width : window.tn.window_width; var elementLeftUnits = t396_elem__getFieldValue(element, 'leftunits'); if (elementLeftUnits === '%') { value = t396_roundFloat(elementContainerWidth * value / 100) }
            if (!isTildaModeEdit && isScaled) { if (container === 'grid' && isOnlyScalable) value = value * window.tn_scale_factor } else { value = offsetLeft + value }
            if (valueAxisX === 'center') {
                elementWidth = t396_elem__getWidth(element); if (isScaledElement && elementContainer !== 'window') { elementContainerWidth *= window.tn_scale_factor; elementWidth *= window.tn_scale_factor }
                value = elementContainerWidth / 2 - elementWidth / 2 + value
            }
            if (valueAxisX === 'right') {
                elementWidth = t396_elem__getWidth(element); if (isScaledElement && elementContainer !== 'window') { elementContainerWidth *= window.tn_scale_factor; elementWidth *= window.tn_scale_factor }
                value = elementContainerWidth - elementWidth + value
            }
            if (isScaledElement && elementContainer !== 'window') { elementWidth = t396_elem__getWidth(element); value = value + (elementWidth * window.tn_scale_factor - elementWidth) / 2 }
            break; case 'top': var artBoardParent = element.parentNode; var proxyMinOffsetTop = artBoardParent ? artBoardParent.getAttribute('data-artboard-proxy-min-offset-top') : '0'; var proxyMinHeight = artBoardParent ? artBoardParent.getAttribute('data-artboard-proxy-min-height') : '0'; var proxyMaxHeight = artBoardParent ? artBoardParent.getAttribute('data-artboard-proxy-max-height') : '0'; var getElementHeight = function (element) {
                var height = t396_elem__getHeight(element); if (element && element.getAttribute('data-elem-type') === 'image') { var width = t396_elem__getWidth(element); var fileWidth = t396_elem__getFieldValue(element, 'filewidth'); var fileHeight = t396_elem__getFieldValue(element, 'fileheight'); if (fileWidth && fileHeight) { var ratio = parseInt(fileWidth) / parseInt(fileHeight); height = width / ratio } }
                return height
            }; elementContainer = container === 'grid' ? 'grid' : 'window'; offsetTop = container === 'grid' ? parseFloat(proxyMinOffsetTop) : 0; elementContainerHeight = container === 'grid' ? parseFloat(proxyMinHeight) : parseFloat(proxyMaxHeight); var elTopUnits = t396_elem__getFieldValue(element, 'topunits'); if (elTopUnits === '%') { value = (elementContainerHeight * (value / 100)) }
            if (isScaledElement && elementContainer !== 'window') { value *= window.tn_scale_factor }
            if (isZoomedElement && elementContainer !== 'window') { offsetTop = verticalAlignValue === 'stretch' ? 0 : (offsetTop / window.tn_scale_factor) }
            value = offsetTop + value; var artBoardHeightVH = t396_ab__getFieldValue(artBoardParent, 'height_vh'); var artBoardMinHeight = t396_ab__getFieldValue(artBoardParent, 'height'); var artBoardMaxHeight = t396_ab__getHeight(artBoardParent); if (isScaled && !isTildaModeEdit && artBoardHeightVH) { var scaledMinHeight = parseInt(artBoardMinHeight, 10) * window.tn_scale_factor }
            if (valueAxisY === 'center') {
                elementHeight = getElementHeight(element); if (isScaledElement && elementContainer !== 'window') {
                    if (verticalAlignValue !== 'stretch') { elementContainerHeight = elementContainerHeight * window.tn_scale_factor } else { if (scaledMinHeight) { elementContainerHeight = scaledMinHeight > artBoardMaxHeight ? scaledMinHeight : artBoardMaxHeight } else { elementContainerHeight = artBoardParent.clientHeight } }
                    elementHeight *= window.tn_scale_factor
                }
                if (!isTildaModeEdit && isScaled && !isOnlyScalable && elementContainer !== 'window' && verticalAlignValue === 'stretch') {
                    if (scaledMinHeight) { elementContainerHeight = scaledMinHeight > artBoardMaxHeight ? scaledMinHeight : artBoardMaxHeight } else { elementContainerHeight = artBoardParent.clientHeight }
                    elementContainerHeight = elementContainerHeight / window.tn_scale_factor
                }
                value = elementContainerHeight / 2 - elementHeight / 2 + value
            }
            if (valueAxisY === 'bottom') {
                elementHeight = getElementHeight(element); if (isScaledElement && elementContainer !== 'window') {
                    if (verticalAlignValue !== 'stretch') { elementContainerHeight = elementContainerHeight * window.tn_scale_factor } else { if (scaledMinHeight) { elementContainerHeight = scaledMinHeight > artBoardMaxHeight ? scaledMinHeight : artBoardMaxHeight } else { elementContainerHeight = artBoardParent.clientHeight } }
                    elementHeight *= window.tn_scale_factor
                }
                if (!isTildaModeEdit && isScaled && !isOnlyScalable && elementContainer !== 'window' && verticalAlignValue === 'stretch') {
                    if (scaledMinHeight) { elementContainerHeight = scaledMinHeight > artBoardMaxHeight ? scaledMinHeight : artBoardMaxHeight } else { elementContainerHeight = artBoardParent.clientHeight }
                    elementContainerHeight = elementContainerHeight / window.tn_scale_factor
                }
                value = elementContainerHeight - elementHeight + value
            }
            if (isScaledElement && elementContainer !== 'window') { elementHeight = getElementHeight(element); value = value + (elementHeight * window.tn_scale_factor - elementHeight) / 2 }
            break
    }
    return value
}
function t396_ab__setFieldValue(artBoard, prop, val, resolution) { if (!resolution) resolution = window.tn.curResolution; if (resolution < 1200) { if (artBoard) artBoard.setAttribute('data-artboard-' + prop + '-res-' + resolution, val) } else { if (artBoard) artBoard.setAttribute('data-artboard-' + prop, val) } }
function t396_ab__getFieldValue(artBoard, prop) {
    if (!artBoard) return; var resolution = window.tn.curResolution; var breakpoints = [1200, 960, 640, 480, 320]; var dataField; breakpoints.forEach(function (breakpoint, i) {
        if (i === 0 && +resolution >= breakpoint) { dataField = artBoard.getAttribute('data-artboard-' + prop) }
        if (i > 0 && +resolution === breakpoint) {
            dataField = artBoard.getAttribute('data-artboard-' + prop + '-res-' + breakpoint); if (i > 1 && !dataField) { var slicedBreakpoints = breakpoints.slice(1, i); for (var n = slicedBreakpoints.length - 1; n >= 0; n--) { dataField = artBoard.getAttribute('data-artboard-' + prop + '-res-' + slicedBreakpoints[n]); if (dataField) break } }
            if (!dataField) dataField = artBoard.getAttribute('data-artboard-' + prop)
        }
    }); return dataField ? dataField : ''
}
function t396_ab__renderViewOneField(artBoard, field) { t396_ab__getFieldValue(artBoard, field) }
function t396_allelems__renderView(artBoard) { if (!artBoard) return !1; tn_console('func: allelems__renderView: abid:' + artBoard.getAttribute('data-artboard-recid')); var ArtBoardelements = artBoard.querySelectorAll('.tn-elem'); Array.prototype.forEach.call(ArtBoardelements, function (element) { t396_elem__renderView(element) }) }
function t396_ab__filterUpdate(artBoard) { var filter = artBoard.querySelector('.t396__filter'); if (!filter) return; var filterColorRgb = filter.getAttribute('data-filtercolor-rgb'); var filterColorRgb2 = filter.getAttribute('data-filtercolor2-rgb'); var filterOpacity = filter.getAttribute('data-filteropacity'); var filterOpacity2 = filter.getAttribute('data-filteropacity2'); if (filterColorRgb && !filterColorRgb2) { filter.style.backgroundColor = 'rgba(' + filterColorRgb + ',' + filterOpacity + ')' } else if (!filterColorRgb && filterColorRgb2) { filter.style.backgroundColor = 'rgba(' + filterColorRgb2 + ',' + filterOpacity2 + ')' } else if (filterColorRgb && filterColorRgb2) { filter.style.background = '-webkit-gradient(linear, left top, left bottom, from(rgba(' + filterColorRgb + ',' + filterOpacity + ')), to(rgba(' + filterColorRgb2 + ',' + filterOpacity2 + ')) )' } else { filter.style.backgroundColor = 'transparent' } }
function t396_ab__getHeight(artBoard, artBoardHeight) {
    if (!artBoardHeight) artBoardHeight = t396_ab__getFieldValue(artBoard, 'height'); artBoardHeight = parseFloat(artBoardHeight); var artBoardHeightVH = t396_ab__getFieldValue(artBoard, 'height_vh'); if (artBoardHeightVH) { artBoardHeightVH = parseFloat(artBoardHeightVH); if (!isNaN(artBoardHeightVH)) { var artBoardHeightVHpx = window.tn.window_height * artBoardHeightVH / 100; if (artBoardHeight < artBoardHeightVHpx) { artBoardHeight = artBoardHeightVHpx } } }
    return artBoardHeight
}
function t396_hex2rgb(hexStr) { var hex = parseInt(hexStr.substring(1), 16); var r = (hex & 0xff0000) >> 16; var g = (hex & 0x00ff00) >> 8; var b = hex & 0x0000ff; return [r, g, b] }
String.prototype.t396_replaceAll = function (search, replacement) { var target = this; return target.replace(new RegExp(search, 'g'), replacement) }; function t396_elem__getWidth(element, value) {
    element = t396_getEl(element); if (!value) value = t396_elem__getFieldValue(element, 'width'); value = parseFloat(value); var elWidthUnits = t396_elem__getFieldValue(element, 'widthunits'); if (elWidthUnits === '%') { var elementContainer = t396_elem__getFieldValue(element, 'container'); if (elementContainer === 'window') { value = window.tn.window_width * value / 100 } else { value = window.tn.grid_width * value / 100 } }
    return value
}
function t396_elem__getHeight(element, value) {
    element = t396_getEl(element); if (!value) value = t396_elem__getFieldValue(element, 'height'); value = parseFloat(value); var elemType = element.getAttribute('data-elem-type'); if (elemType === 'shape' || elemType === 'video' || elemType === 'html' || elemType === 'gallery') { var elHeightUnits = t396_elem__getFieldValue(element, 'heightunits'); if (elHeightUnits === '%') { var artBoard = element.parentNode; var proxyMinHeight = artBoard ? artBoard.getAttribute('data-artboard-proxy-min-height') : '0'; var proxyMaxHeight = artBoard ? artBoard.getAttribute('data-artboard-proxy-max-height') : '0'; var artBoardMinHeight = parseFloat(proxyMinHeight); var artBoardMaxHeight = parseFloat(proxyMaxHeight); var elementContainer = t396_elem__getFieldValue(element, 'container'); if (elementContainer === 'window') { value = artBoardMaxHeight * (value / 100) } else { value = artBoardMinHeight * (value / 100) } } } else if (elemType !== 'button') { value = element.clientHeight }
    return value
}
function t396_roundFloat(n) { n = Math.round(n * 100) / 100; return (n) }
function tn_console(str) { if (+(window.tn_comments) === 1) console.log(str) }
function t396_setUpTooltip_desktop(element, tooltip, tooltipContent) { element = t396_getEl(element); var timer; if (tooltip) { tooltip.addEventListener('mouseover', function () { var visibleEls = document.querySelectorAll('.tn-atom__tip_visible'); Array.prototype.forEach.call(visibleEls, function (visibleEl) { var curTipEl = visibleEl.closest('.t396__elem'); var cirTipElID = curTipEl ? curTipEl.getAttribute('data-elem-id') : ''; if (cirTipElID !== element.getAttribute('data-elem-id')) { t396_hideTooltip(curTipEl, visibleEl) } }); clearTimeout(timer); if (tooltipContent && tooltipContent.style.display === 'block') return; t396_showTooltip(element, tooltipContent) }); tooltip.addEventListener('mouseout', function () { timer = setTimeout(function () { t396_hideTooltip(element, tooltipContent) }, 300) }) } }
function t396_setUpTooltip_mobile(element, tooltip, tooltipContent) {
    element = t396_getEl(element); if (tooltip) { tooltip.addEventListener('click', function () { if (tooltipContent && tooltipContent.style.display === 'block' && tooltip.classList.contains('tn-atom__pin')) { t396_hideTooltip(element, tooltipContent) } else { t396_showTooltip(element, tooltipContent) } }) }
    var elementID = element.getAttribute('data-elem-id'); document.addEventListener('click', function (e) {
        if (e.target.closest('.tn-atom__pin')) { var zbEl = e.target.closest('.t396__elem'); var clickedPinId = zbEl ? zbEl.getAttribute('data-elem-id') : ''; if (clickedPinId === elementID) return }
        t396_hideTooltip(element, tooltipContent)
    })
}
function t396_hideTooltip(element, tooltipContent) { if (tooltipContent) tooltipContent.style.display = ''; if (tooltipContent) tooltipContent.style.left = ''; if (tooltipContent) tooltipContent.style.transform = ''; if (tooltipContent) tooltipContent.style.right = ''; if (tooltipContent) tooltipContent.classList.remove('tn-atom__tip_visible'); if (element) element.style.zIndex = '' }
function t396_showTooltip(element, tooltipContent) {
    element = t396_getEl(element); var pos = element.getAttribute('data-field-tipposition-value'); if (!pos) pos = 'top'; var elSize = element.clientHeight; var elTop = element.getBoundingClientRect().top + window.pageYOffset; var elBottom = elTop + elSize; var elLeft = element.getBoundingClientRect().left + window.pageXOffset; var elRight = elLeft + elSize; var winTop = window.pageYOffset; var winWidth = document.documentElement.clientWidth; var winBottom = winTop + document.documentElement.clientHeight; var tipElHeight = tooltipContent ? tooltipContent.offsetHeight : 0; var tipElWidth = tooltipContent ? tooltipContent.offsetWidth : 0; var padding = 15; var tipElRight; var tipElLeft; var tipElTop; var tipElBottom; if (pos === 'right' || pos === 'left') { tipElRight = elRight + padding + tipElWidth; tipElLeft = elLeft - padding - tipElWidth; if ((pos === 'right' && tipElRight > winWidth) || (pos === 'left' && tipElLeft < 0)) { pos = 'top' } }
    if (pos === 'top' || pos === 'bottom') {
        tipElRight = elRight + (tipElWidth / 2 - elSize / 2); tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2); if (tipElRight > winWidth) { var rightOffset = -(winWidth - elRight - padding); if (tooltipContent) tooltipContent.style.left = 'auto'; if (tooltipContent) tooltipContent.style.transform = 'none'; if (tooltipContent) tooltipContent.style.right = rightOffset + 'px' }
        if (tipElLeft < 0) { var leftOffset = -(elLeft - padding); if (tooltipContent) tooltipContent.style.left = leftOffset + 'px'; if (tooltipContent) tooltipContent.style.transform = 'none' }
    }
    if (pos === 'top') { tipElTop = elTop - padding - tipElHeight; tipElBottom = elBottom + padding + tipElHeight; if (winBottom > tipElBottom && winTop > tipElTop) { pos = 'bottom' } }
    if (pos === 'bottom') { tipElTop = elTop - padding - tipElHeight; tipElBottom = elBottom + padding + tipElHeight; if (winBottom < tipElBottom && winTop < tipElTop) { pos = 'top' } }
    if (tooltipContent) tooltipContent.setAttribute('data-tip-pos', pos); if (tooltipContent) tooltipContent.style.display = 'block'; if (tooltipContent) tooltipContent.classList.add('tn-atom__tip_visible'); if (element) element.style.zIndex = '1000'
}
function t396_hex2rgba(hexStr, opacity) { if (!hexStr) return !1; var hex = parseInt(hexStr.substring(1), 16); var r = (hex & 0xff0000) >> 16; var g = (hex & 0x00ff00) >> 8; var b = hex & 0x0000ff; return [r, g, b, parseFloat(opacity)] }
function t396_removeElementFromDOM(el) { el = t396_getEl(el); if (el && el.parentNode) { el.parentNode.removeChild(el) } }
function t396_getEl(el) { if (el instanceof jQuery) { return el.length ? el.get(0) : null } else { return el } }
if (!Element.prototype.matches) { Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector }
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this; while (el && el.nodeType === 1) {
            if (Element.prototype.matches.call(el, s)) { return el }
            el = el.parentElement || el.parentNode
        }
        return null
    }
}
function t552_init(recid, ratio) { var rec = document.getElementById('rec' + recid); var recordBlock = rec ? rec.querySelector('.t552') : null; t552__setHeight(recid, ratio); window.addEventListener('resize', t_throttle(function () { t552__setHeight(recid, ratio) })); if (typeof jQuery !== 'undefined') { $(recordBlock).on('displayChanged', function () { t552__setHeight(recid, ratio) }) } else { if (recordBlock) { recordBlock.addEventListener('displayChanged', function () { t552__setHeight(recid, ratio) }) } } }
function t552__setHeight(recid, ratio) { var rec = document.getElementById('rec' + recid); var firstIMG = rec.querySelector('.t552__blockimg'); var images = rec.querySelectorAll('.t552__blockimg'); Array.prototype.forEach.call(images, function (img) { var calculatedHeight = Math.floor(firstIMG.offsetWidth * ratio); img.style.height = calculatedHeight + 'px' }) }
function t585_init(recId) {
    var rec = document.getElementById('rec' + recId); if (!rec) return; var accordion = rec.querySelectorAll('.t585__accordion')[0]; var headers = rec.querySelectorAll('.t585__header'); var isLazy = document.getElementById('allrecords').getAttribute('data-tilda-lazy'); var accordionScroll; if (accordion) { accordionScroll = accordion.getAttribute('data-scroll-to-expanded'); accordion = accordion.getAttribute('data-accordion') } else { accordion = 'false'; accordionScroll = 'false' }
    for (var i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', function () {
            var element = this; var container = element.nextElementSibling; var activeHeight = 0; var isAccordionDown = !1; if (element.classList.contains('t585__opened')) { element.classList.remove('t585__opened'); t585_accordionHide(container) } else {
                if (accordionScroll === 'true' && accordion === 'true') { activeHeight = t585__getOldAction(rec); isAccordionDown = t585__getAccordionPosition(headers, element) }
                if (accordion === 'true') t585_accordionAllHide(headers); element.classList.add('t585__opened'); container.style.display = 'block'; var height = container.scrollHeight; container.style.maxHeight = '0px'; setTimeout(function () { container.style.maxHeight = height + 'px'; if (accordionScroll === 'true') { t585__calcHeight(element, container, activeHeight, isAccordionDown) } }, 0)
            }
            if (window.lazy === 'y' || isLazy === 'yes') { t_onFuncLoad('t_lazyload_update', function () { t_lazyload_update() }) }
        })
    }
}
function t585_accordionAllHide(headers) { for (var i = 0; i < headers.length; i++) { var elementHide = headers[i]; elementHide.classList.remove('t585__opened'); t585_accordionHide(elementHide.nextElementSibling) } }
function t585_accordionHide(container) { if (!container.style.maxHeight) container.style.maxHeight = container.scrollHeight + 'px'; setTimeout(function () { container.style.maxHeight = '0px' }, 0) }
function t585__getOldAction(rec) { var activeHeader = rec.querySelector('.t585__opened'); var activeHeight = 0; if (activeHeader) var activeContainer = activeHeader.nextElementSibling; if (activeContainer) activeHeight = activeContainer.offsetHeight; return activeHeight }
function t585__getAccordionPosition(headers, element) {
    var oldIndex; var newIndex; for (var i = 0; i < headers.length; i++) { var header = headers[i]; if (header.classList.contains('t585__opened')) oldIndex = i; if (header === element) newIndex = i }
    return oldIndex < newIndex ? !0 : !1
}
function t585__calcHeight(element, container, activeHeight, isAccordionDown) { var windowHeight = window.innerHeight; var windowScroll = window.scrollY; var containerHeight = container.scrollHeight; var accordionHeight = containerHeight + element.offsetHeight; var elementTopOffset = element.getBoundingClientRect().top + windowScroll; var target = isAccordionDown ? elementTopOffset - activeHeight : elementTopOffset; if (target < windowScroll || accordionHeight > windowHeight) { t585__scroll(target) } }
function t585__scroll(target) {
    var duration = 400; var start = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0); var change = target - start; var currentTime = 0; var increment = 16; document.body.setAttribute('data-scrollable', 'true'); function t585__easeInOutCubic(currentTime) { if ((currentTime /= duration / 2) < 1) { return change / 2 * currentTime * currentTime * currentTime + start } else { return change / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + start } }
    function t585__animateScroll() { currentTime += increment; window.scrollTo(0, t585__easeInOutCubic(currentTime)); if (currentTime < duration) { setTimeout(t585__animateScroll, increment) } else { document.body.removeAttribute('data-scrollable') } }
    t585__animateScroll()
}
function t702_initPopup(recId) {
    var rec = document.getElementById('rec' + recId); if (!rec) return; var container = rec.querySelector('.t702'); if (!container) return; rec.setAttribute('data-animationappear', 'off'); rec.setAttribute('data-popup-subscribe-inited', 'y'); rec.style.opacity = 1; var documentBody = document.body; var popup = rec.querySelector('.t-popup'); var popupTooltipHook = popup.getAttribute('data-tooltip-hook'); var analitics = popup.getAttribute('data-track-popup'); var popupCloseBtn = popup.querySelector('.t-popup__close'); var hrefs = rec.querySelectorAll('a[href*="#"]'); var submitHref = rec.querySelector('.t-submit[href*="#"]'); if (popupTooltipHook) { var recBlocks = document.querySelectorAll('.r'); for (var i = 0; i < recBlocks.length; i++) { recBlocks[i].addEventListener('click', function (event) { var target = event.target; var href = target.closest('a[href="' + popupTooltipHook + '"]') ? target : !1; if (!href) return; event.preventDefault(); t702_showPopup(recId); t702_resizePopup(recId); t702__lazyLoad(); if (analitics) { Tilda.sendEventToStatistics(analitics, popupTooltipHook) } }) } }
    popup.addEventListener('scroll', t_throttle(function () { t702__lazyLoad() })); popup.addEventListener('click', function (event) { var windowWithoutScrollBar = window.innerWidth - 17; if (event.clientX > windowWithoutScrollBar) return; if (event.target === this) t702_closePopup() }); popupCloseBtn.addEventListener('click', t702_closePopup); if (submitHref) { submitHref.addEventListener('click', function () { if (documentBody.classList.contains('t-body_scroll-locked')) { documentBody.classList.remove('t-body_scroll-locked') } }) }
    for (var i = 0; i < hrefs.length; i++) { hrefs[i].addEventListener('click', function () { var url = this.getAttribute('href'); if (!url || url.substring(0, 7) != '#price:') { t702_closePopup(); if (!url || url.substring(0, 7) == '#popup:') { setTimeout(function () { documentBody.classList.add('t-body_popupshowed') }, 300) } } }) }
}
function t702_lockScroll() { var documentBody = document.body; if (!documentBody.classList.contains('t-body_scroll-locked')) { var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || documentBody.parentNode || documentBody).scrollTop; documentBody.classList.add('t-body_scroll-locked'); documentBody.style.top = '-' + bodyScrollTop + 'px'; documentBody.setAttribute('data-popup-scrolltop', bodyScrollTop) } }
function t702_unlockScroll() { var documentBody = document.body; if (documentBody.classList.contains('t-body_scroll-locked')) { var bodyScrollTop = documentBody.getAttribute('data-popup-scrolltop'); documentBody.classList.remove('t-body_scroll-locked'); documentBody.style.top = null; documentBody.removeAttribute('data-popup-scrolltop'); document.documentElement.scrollTop = parseInt(bodyScrollTop) } }
function t702_showPopup(recId) {
    var rec = document.getElementById('rec' + recId); if (!rec) return; var container = rec.querySelector('.t702'); if (!container) return; var popup = rec.querySelector('.t-popup'); var popupContainer = popup.querySelector('.t-popup__container'); var range = rec.querySelector('.t-range'); var documentBody = document.body; popup.style.display = 'block'; if (range) t702__triggerEvent(range, 'popupOpened'); setTimeout(function () { popupContainer.classList.add('t-popup__container-animated'); popup.classList.add('t-popup_show') }, 50); documentBody.classList.add('t-body_popupshowed'); documentBody.classList.add('t702__body_popupshowed'); if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) { setTimeout(function () { t702_lockScroll() }, 500) }
    document.addEventListener('keydown', t702_escClosePopup); t702__lazyLoad()
}
function t702_escClosePopup(event) { if (event.key === 'Escape') t702_closePopup() }
function t702_closePopup() {
    var popupAll = document.querySelectorAll('.t-popup'); document.body.classList.remove('t-body_popupshowed'); document.body.classList.remove('t702__body_popupshowed'); for (var i = 0; i < popupAll.length; i++) { popupAll[i].classList.remove('t-popup_show') }
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) { t702_unlockScroll() }
    setTimeout(function () { var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)'); for (var i = 0; i < popupHide.length; i++) { popupHide[i].style.display = 'none' } }, 300); document.removeEventListener('keydown', t702_escClosePopup)
}
function t702_resizePopup(recId) { var rec = document.getElementById('rec' + recId); if (!rec) return; var popupContainer = rec.querySelector('.t-popup__container'); if (!popupContainer) return; var popupStyle = getComputedStyle(popupContainer, null); var popupPaddingTop = parseInt(popupStyle.paddingTop) || 0; var popupPaddingBottom = parseInt(popupStyle.paddingBottom) || 0; var popupHeight = popupContainer.clientHeight - (popupPaddingTop + popupPaddingBottom); if (popupHeight > (window.innerHeight - 120)) { popupContainer.classList.add('t-popup__container-static') } else { popupContainer.classList.remove('t-popup__container-static') } }
function t702_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/'; var virtTitle = 'Popup: '; if (popupName.substring(0, 7) == '#popup:') { popupName = popupName.substring(7) }
    virtPage += popupName; virtTitle += popupName; if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') { Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0) } else {
        if (ga) { if (window.mainTracker != 'tilda') { ga('send', { 'hitType': 'pageview', 'page': virtPage, 'title': virtTitle }) } }
        if (window.mainMetrika && window[window.mainMetrika]) { window[window.mainMetrika].hit(virtPage, { title: virtTitle, referer: window.location.href }) }
    }
}
function t702_onSuccess(form) {
    if (!(form instanceof Element)) form = form[0]; var inputsWrapper = form.querySelector('.t-form__inputsbox'); var inputsWrapperStyle = getComputedStyle(inputsWrapper, null); var inputsWrapperPaddingTop = parseInt(inputsWrapperStyle.paddingTop) || 0; var inputsWrapperPaddingBottom = parseInt(inputsWrapperStyle.paddingBottom) || 0; var inputsWrapperHeight = inputsWrapper.clientHeight - (inputsWrapperPaddingTop + inputsWrapperPaddingBottom); var inputsOffset = inputsWrapper.getBoundingClientRect().top + window.pageYOffset; var inputsBottom = inputsWrapperHeight + inputsOffset; var successBox = form.querySelector('.t-form__successbox'); var successBoxOffset = successBox.getBoundingClientRect().top + window.pageYOffset; var target = 0; var windowHeight = window.innerHeight; var body = document.body; var html = document.documentElement; var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); if (window.innerWidth > 960) { target = successBoxOffset - 200 } else { target = successBoxOffset - 100 }
    var tildaLabel = document.querySelector('.t-tildalabel'); if (successBoxOffset > window.scrollY || (documentHeight - inputsBottom) < (windowHeight - 100)) { inputsWrapper.classList.add('t702__inputsbox_hidden'); setTimeout(function () { if (windowHeight > documentHeight && tildaLabel) { t702__fadeOut(tildaLabel) } }, 300) } else { t702__scroll(target); setTimeout(function () { inputsWrapper.classList.add('t702__inputsbox_hidden') }, 400) }
    var successUrl = $(form).data('success-url'); if (successUrl) { setTimeout(function () { window.location.href = successUrl }, 500) }
}
function t702__fadeOut(el) { if (el.style.display === 'none') return; var opacity = 1; var timer = setInterval(function () { el.style.opacity = opacity; opacity -= 0.1; if (opacity <= 0.1) { clearInterval(timer); el.style.display = 'none'; el.style.opacity = null } }, 50) }
function t702__scroll(target) {
    var duration = 400; var start = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0); var change = target - start; var currentTime = 0; var increment = 16; document.body.setAttribute('data-scrollable', 'true'); function t702__easeInOutCubic(currentTime) { if ((currentTime /= duration / 2) < 1) { return change / 2 * currentTime * currentTime * currentTime + start } else { return change / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + start } }
    function t702__animateScroll() { currentTime += increment; window.scrollTo(0, t702__easeInOutCubic(currentTime)); if (currentTime < duration) { setTimeout(t702__animateScroll, increment) } else { document.body.removeAttribute('data-scrollable') } }
    t702__animateScroll()
}
function t702__lazyLoad() { if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') { t_onFuncLoad('t_lazyload_update', function () { t_lazyload_update() }) } }
function t702__triggerEvent(el, eventName) {
    var event; if (typeof window.CustomEvent === 'function') { event = new CustomEvent(eventName) } else if (document.createEvent) { event = document.createEvent('HTMLEvents'); event.initEvent(eventName, !0, !1) } else if (document.createEventObject) { event = document.createEventObject(); event.eventType = eventName }
    event.eventName = eventName; if (el.dispatchEvent) { el.dispatchEvent(event) } else if (el.fireEvent) { el.fireEvent('on' + event.eventType, event) } else if (el[eventName]) { el[eventName]() } else if (el['on' + eventName]) { el['on' + eventName]() }
    if (t702__checkJqueryEvent(el, eventName)) { $(el).trigger(eventName) }
}
function t702__checkJqueryEvent(element, eventName) {
    var events = $._data(element, 'events') || !1; var isEvent = !1; if (events) { for (var key in events) { if (key === eventName) { isEvent = !0; break } } }
    return isEvent
}
function t706_onSuccessCallback(t706_form) { $(".t706__cartwin-products").slideUp(10, function () { }); $(".t706__cartwin-bottom").slideUp(10, function () { }); $(".t706 .t-form__inputsbox").slideUp(700, function () { }); try { tcart__unlockScroll() } catch (e) { } }
function t774_init(recId) { var rec = document.getElementById('rec' + recId); if (!rec) return; var container = rec.querySelector('.t774'); if (!container) return; t774_unifyHeights(recId); window.addEventListener('resize', t_throttle(function () { t774_unifyHeights(recId) }, 200)); $(container).on('displayChanged', function () { t774_unifyHeights(recId) }); window.addEventListener('load', function () { t774_unifyHeights(recId) }); setTimeout(function () { t774__updateLazyLoad(recId) }, 500) }
function t774__updateLazyLoad(recId) { var allRecords = document.getElementById('allrecords'); var container = document.querySelector('#rec' + recId + ' .t774__container_mobile-flex'); var mode = allRecords.getAttribute('data-tilda-mode'); if (container && mode !== 'edit' && mode !== 'preview' && window.lazy === 'y') { container.addEventListener('scroll', t_throttle(function () { if (window.lazy === 'y' || allRecords.getAttribute('data-tilda-lazy') === 'yes') { t_onFuncLoad('t_lazyload_update', function () { t_lazyload_update() }) } }, 500)) } }
function t774_unifyHeights(recId) {
    var rec = document.getElementById('rec' + recId); if (!rec) return; var container = rec.querySelector('.t774__container'); if (!container) return; var attrPerRow = container.getAttribute('data-blocks-per-row'); var contentsList = rec.querySelectorAll('.t774__content'); var lengthScrollIcon = rec.querySelectorAll('.t774__scroll-icon-wrapper').length; var contents = Array.prototype.slice.call(contentsList); if (window.innerWidth <= 480 && lengthScrollIcon === 0) {
        for (var i = 0; i < contents.length; i++) { contents[i].style.height = 'auto' }
        return
    }
    var countRow = +attrPerRow; if (window.innerWidth <= 960 && lengthScrollIcon > 0) { countRow = contents.length } else if (window.innerWidth <= 960) { countRow = 2 }
    for (var i = 0; i < contents.length; i += countRow) {
        var maxHeight = 0; var cols = contents.slice(i, i + countRow); for (var j = 0; j < cols.length; j++) { var col = cols[j]; var textWrap = col.querySelector('.t774__textwrapper'); var btns = col.querySelectorAll('.t774__btn-wrapper, .t774__btntext-wrapper'); var colHeight = textWrap.offsetHeight + (btns[0] ? btns[0].offsetHeight : 0); if (colHeight > maxHeight) maxHeight = colHeight }
        for (var j = 0; j < cols.length; j++) { cols[j].style.height = maxHeight + 'px' }
    }
}
function t802_insta_init(recid, instauser) { var projectid = $('#allrecords').attr('data-tilda-project-id'); t802_insta_loadflow(recid, projectid, instauser) }
function t802_insta_loadflow(recid, projectid, instauser) {
    if (instauser == '') { var url = "https://insta.tildacdn.com/fish/0.json" } else { var url = "https://insta.tildacdn.com/json/project" + projectid + "_" + instauser + ".json" }
    $.ajax({ type: "GET", url: url, dataType: "json", success: function (data) { if (typeof data == 'object') { t802_insta_draw(recid, data) } else { console.log('error. insta flow json not object'); console.log(data) } }, error: function () { console.log('error load instgram flow') }, timeout: 1000 * 90 })
}
function t802_insta_draw(recid, obj) {
    if (typeof obj.photos == 'undefined') { return }
    $.each(obj.photos, function (index, item) { t802_insta_drawItem(recid, obj.username, item) }); if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') { t_onFuncLoad('t_lazyload_update', function () { t_lazyload_update() }) }
}
function t802_insta_drawItem(recid, username, item) {
    var emptyEl = $("#rec" + recid).find(".t802__imgwrapper_empty").first(); if (emptyEl.length > 0) {
        emptyEl.removeClass("t802__imgwrapper_empty"); if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') { emptyEl.append('<div class="t802__bgimg t-bgimg" data-original="' + item.url + '"></div>') } else { emptyEl.append('<div class="t802__bgimg" style="background-image:url(' + item.url + ')"></div>') }
        emptyEl.wrap('<a href="' + item.link + '" target="_blank"></a>'); var hoverEl = emptyEl.find(".t802__hover-wrapper"); if (hoverEl.length > 0 && isMobile == !1) { var text = t802_insta_cropText(recid, '@' + username + ': ' + item.text); hoverEl.append('<div class="t802__hover-filter"></div>'); hoverEl.append('<div class="t802__text t-text t-descr_xxs">' + text + '</div>') }
    }
}
function t802_insta_cropText(recid, text) {
    var colsInLine = $("#rec" + recid).find("[data-cols-in-line]").attr("data-cols-in-line"); if (colsInLine == 6) { var maxLength = 90 } else { var maxLength = 130 }
    if (text.length > maxLength) { text = text.substring(0, maxLength); text = text.substring(0, Math.min(maxLength, text.lastIndexOf(" "))); text += ' ...' }
    return text
}