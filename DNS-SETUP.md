# DNS — Personal Prime (adicionar tudo de uma vez no final, no seu registrador)

## 1) Site (Vercel) — para www.personalprime.com.br funcionar
| Tipo  | Nome | Valor |
|-------|------|-------|
| CNAME | www  | cname.vercel-dns.com |
| A     | @    | 76.76.21.21 |

## 2) E-mail (Resend) — para enviar de contato@personalprime.com.br
| Tipo | Nome | Valor | Prioridade |
|------|------|-------|------------|
| TXT  | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzzN80rEt9BXzjkYhSYCLAAty5qBPWA9jiIZQvDpPEFhyZSlY7itkqpehK9QZkNfjdoD2ryrv2DfVPUVdimCcIbw0/PFFfy1ZLQm1uJqjjEjZIUhbFBP7ARP3oh+oBenGwJbFpF0Z28Mw3rrmVrohsd8K+vcdEBkprAjoM1Rrx+wIDAQAB | — |
| MX   | send | feedback-smtp.sa-east-1.amazonses.com | 10 |
| TXT  | send | v=spf1 include:amazonses.com ~all | — |

Depois de adicionar o bloco 2, me avisa que eu rodo a verificação do domínio no Resend.
