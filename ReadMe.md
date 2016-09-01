Advanced jQuery Read More v1.0
==============================================

Dynamic Read More plugin for jQuery

(c) 2016 David Whitworth (david@whitworth.de)

Released under the GNU General Public License (GPL)

---

## Description

A small but versatile jQuery plugin that allows you to truncate specific sections of your content and then creates a link to toggle the full content.

---

## Setup

1. Copy the files from the css and js directories to your corresponding asset directories.
2. Include the advanced-read-more.css or advanced-read-more.min.css in the `<head>`

```html
<link href="css/advanced-read-more.min.css" rel="stylesheet" />
```

3. Include jQuery (if you haven't already) followed by advanced-read-more.js or advanced-read-more.min.js in the `<head>`

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/advanced-read-more.min.js"></script>
```

4. Initialize the plugin below the included scripts, like so:

```javascript
<script type='text/javascript'>
    $('body').readMore();
</script>
```

Or with custom options...

```javascript
<script type='text/javascript'>
    $('body').readMore({
        showLines: 5,
        linkCaption: 'expand...',
        linkCloseCaption: 'reduce...',
        linkHint: 'Click for more information'
    });
</script>
```

---

## Live-Demo

You can find a more detailed introduction including demos for the script here:

http://whitworth.de/ReadMore/ReadMe.html

---

## Miscellaneous

If you're interested in my other plugins, like the scroll progress tracker used in this ReadMe, feel free to download them from GitHub or JSClasses.org:

https://github.com/Manostion
http://www.jsclasses.org/browse/author/20883.html

---

## Questions & Feedback

If you have any questions, notice any bugs, have issues getting the plugin to work, have an idea for a cool feature to be added, or would like to leave any other kind of feedback, feel free to contact me under David@Whitworth.de

Also, please, feel free to send me links to websites where you used this! =)