const footerLinks = [
  ["회사소개", "채용정보", "고객센터", "공지사항"],
  ["전자금융거래약관", "이용약관", "개인정보처리방침", "청소년보호정책"],
  ["입점/제휴 문의", "광고안내", "판매자센터", "IR"],
];

export function FooterLinks() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-4 py-8 text-sm text-slate-500">
        {footerLinks.map((group, index) => (
          <ul key={index} className="space-y-2">
            {group.map((link) => (
              <li key={link} className="cursor-pointer hover:text-coupang-blue">
                {link}
              </li>
            ))}
          </ul>
        ))}
        <div className="text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Coupang Style Frontend.</p>
          <p>본 페이지는 데모용 UI로 실 서비스가 아닙니다.</p>
        </div>
      </div>
    </footer>
  );
}
