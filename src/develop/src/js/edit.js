export default () => {
  ACMS.Ready(() => {
    ACMS.Config.LiteEditorFieldConf.btnPosition = 'bottom';
    ACMS.Config.LiteEditorFieldConf.classNames = {
      LiteEditor: 'entryFormLiteEditor',
      LiteEditorBtnGroup: 'acms-admin-btn-group acms-admin-btn-group-inline',
      LiteEditorBtn: 'acms-admin-btn',
      LiteEditorBtnActive: 'acms-admin-btn acms-admin-btn-active',
      LiteEditorBtnClose: '',
      LiteEditorTooltipInput: 'acms-admin-form-width-full'
    };
    ACMS.Config.LiteEditorFieldConf.btnOptions = [
      { label: 'リンク', tag: 'a', className: '', sampleText: 'リンクテキスト' },
      { label: '強調', tag: 'em', className: 'not-italic text-sky-700 font-bold', sampleText: ' ' },
      { label: '重要', tag: 'strong', className: '', sampleText: ' ' },
      { label: '注意文', tag: 'em', className: 'not-italic bg-amber-200', sampleText: ' ' },
      { label: '注釈', tag: 'small', className: 'text-gray-600 text-sm', sampleText: ' ' },
    ];
    ACMS.Config.LiteEditorConf.btnOptions = [
      { label: 'リンク', tag: 'a', className: '', sampleText: 'リンクテキスト' },
      { label: '強調', tag: 'em', className: 'not-italic text-sky-700 font-bold', sampleText: ' ' },
      { label: '重要', tag: 'strong', className: '', sampleText: ' ' },
      { label: '注意文', tag: 'em', className: 'not-italic bg-amber-200', sampleText: ' ' },
      { label: '注釈', tag: 'small', className: 'text-gray-600 text-sm', sampleText: ' ' },
    ];
  });
}