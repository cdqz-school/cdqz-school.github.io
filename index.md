---
layout: default
title: Home
---

<section class="hero">
    <h1>成都七中北美校友会</h1>
    <p>让每一位七中人在北美都能找到归属感</p>
    <a href="#join" class="cta-button">加入我们</a>
</section>

<div class="features">
    <div class="feature-card">
        <img src="/assets/images/network.svg" alt="Network Icon">
        <h3>校友网络</h3>
        <p>建立强大的校友联系网络，促进职业发展与合作机会</p>
    </div>
    
    <div class="feature-card">
        <img src="/assets/images/events.svg" alt="Events Icon">
        <h3>活动聚会</h3>
        <p>定期组织线上线下活动，重温校园情谊</p>
    </div>
    
    <div class="feature-card">
        <img src="/assets/images/mentorship.svg" alt="Mentorship Icon">
        <h3>经验分享</h3>
        <p>资深校友经验分享，帮助新生代校友发展</p>
    </div>
</div>

<section class="recent-posts">
    <div class="container">
        <h2>最新博文</h2>
        <div class="posts-grid">
            {% for post in site.posts limit:3 %}
            <div class="post-card">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <div class="post-date">{{ post.date | date: "%Y年%m月%d日" }}</div>
                <div class="post-excerpt">
                    {{ post.excerpt | strip_html | truncatewords: 30 }}
                </div>
                <a href="{{ post.url | relative_url }}" class="read-more">阅读更多 →</a>
            </div>
            {% endfor %}
        </div>
        <div class="view-all">
            <a href="/blog" class="cta-button-secondary">查看所有文章</a>
        </div>
    </div>
</section>

<section id="join" class="join-section">
    <div class="container">
        <h2>加入我们</h2>
        <div class="join-content">
            <div class="join-grid">
                <div class="contact-card">
                    <h3>📧 电子邮件</h3>
                    <p>发送邮件至：<a href="mailto:cdqz_alumni@googlegroups.com">cdqz_alumni@googlegroups.com</a></p>
                    <p class="note">请在邮件中包含以下信息：</p>
                    <ul>
                        <li>姓名</li>
                        <li>毕业年份</li>
                        <li>目前所在城市</li>
                        <li>职业/专业</li>
                        <li>简单自我介绍</li>
                    </ul>
                </div>
                
                <div class="contact-card">
                    <h3>💬 微信群</h3>
                    <p>通过邮件联系我们获取加群方式</p>
                    <p class="note">我们会在24小时内回复您的邮件，请注意查收</p>
                    <div class="faq-mini">
                        <p><strong>常见问题：</strong></p>
                        <ul>
                            <li>校友会完全免费，不收取任何会费</li>
                            <li>欢迎所有在北美的七中校友（包括在读学生）</li>
                            <li>定期举办线上线下活动</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section> 