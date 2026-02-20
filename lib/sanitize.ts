/**
 * Clean WordPress HTML content by removing spacer paragraphs
 * that the classic editor inserts between blocks.
 * Matches: <p>&nbsp;</p>, <p> </p>, <p></p>, <p><br></p>, <p><br/></p>
 */
export function cleanWordPressContent(html: string): string {
  return html.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');
}
