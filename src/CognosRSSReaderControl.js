'use strict';
import 'rss-parser/dist/rss-parser';
import { difference } from 'lodash-es';

function CognosRSSReaderControl() {}
CognosRSSReaderControl.prototype.m_oDataStore = {};
CognosRSSReaderControl.prototype.draw = function(oControlHost) {
  var sConfig = oControlHost.configuration ? oControlHost.configuration : {};
  var sURL = sConfig.Url
    ? sConfig.Url
    : 'https://github.com/CognosExt/CognosRSSReaderControl/commits/master.atom';
  dfsd;
  var sProxy = sConfig.Proxy != null ? sConfig.Proxy : true;
  var sShowTitle = sConfig.ShowTitle != null ? sConfig.ShowTitle : true;
  var sShowLinks = sConfig.ShowLinks != null ? sConfig.ShowLinks : true;
  var sNewWindow = sConfig.NewWindow != null ? sConfig.NewWindow : true;
  var sShowContent = sConfig.ShowContent != null ? sConfig.ShowContent : true;
  var sFullHTML = sConfig.FullHTML != null ? sConfig.FullHTML : false;
  var sCategories = sConfig.Categories != null ? sConfig.Categories : [];
  var sMaxItems = sConfig.MaxItems != null ? sConfig.MaxItems : -1;

  var oParameter = oControlHost.getParameter('pl');
  var sParameterValue =
    oParameter && oParameter.values.length > 0 ? oParameter.values[0].use : '';
  var sHtml = '';

  // Note: some RSS feeds can't be loaded in the browser due to CORS security.
  // To get around this, you can use a proxy.
  const CORS_PROXY = sProxy ? 'https://cors-anywhere.herokuapp.com/' : '';

  let parser = new RSSParser();
  parser.parseURL(CORS_PROXY + sURL, function(err, feed) {
    console.log(feed.title);
    if (sShowTitle) {
      sHtml +=
        '<div class="clsDefaultPromptTitle">' + feed.title + '</div><ul>';
    }
    var i = 0;
    feed.items.forEach(function(entry) {
      var lCategories = difference(sCategories, entry.categories);
      var render = entry.categories
        ? entry.categories.length > sCategories.length
        : true;
      if (render) {
        if (i < sMaxItems || sMaxItems <= 0) {
          i++;
          if (sShowLinks) {
            var sTarget = sNewWindow ? 'target="_blank"' : '';
            var sDescription = '';
            if (sShowContent && sFullHTML) {
              sDescription = '</h3>' + entry.content + '</h3>';
            } else if (sShowContent && !sFullHTML) {
              sDescription = '</h3>' + entry.contentSnippet + '</h3>';
            }

            sHtml +=
              '<li><h3><a class="hy" href="' +
              entry.link +
              '" ' +
              sTarget +
              '>' +
              entry.title +
              '</a>' +
              sDescription +
              '</li>';
          } else {
            sHtml += '<li>' + entry.title + '</li>';
          }
        }
      }
      console.log(entry.title + ':' + entry.link);
    });
    sHtml += '</ul>';
    var el = oControlHost.container;
    el.innerHTML = sHtml;
  });
};

export { CognosRSSReaderControl };
