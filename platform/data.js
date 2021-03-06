const entyExct = [
  "中国军事专家李杰27日对《环球时报》记者表示，目前来看，从飞行路线、机型选择、架次规模来看，美军机仍处于常态化巡逻，但不排除美军在亚太地区核动力航母因疫情“趴窝”后，强化美军机侦察、巡逻来弥补大中型战舰不足的考量。",
  "河北冠志农业科技有限公司生产部经理许晓燕介绍称，系统后台通过实时数据分析，可实现棚内自动增降温、自动加抽湿、自动卷帘等功能，农户也可通过手机APP（应用程序）进行手动远程操作，让棚内环境更适合作物生长。",
  "中建交通山东分公司菏泽市万福河桥梁工程项目部定时给复工一线工人送防护用品和矿泉水等，确保复工人员安全有保障和能喝到清凉的生活饮用水，不论是白天还是晚上从不间断",
  "美国太空军武器发展与获取中心代表斯蒂芬·布罗根称，这些地面干扰系统将主要用于在冲突初期暂时阻断航天器的通信信号，而不是摧毁卫星。",
  "俄罗斯卫星通讯社3月13日报道，据知情人士透露，俄罗斯尚未从印度尼西亚处收到有关放弃购买苏-35战斗机合同的通知",
  `Arleigh Burke-class guided-missile destroyer USS McCampbell (DDG-85) transited the Taiwan Strait on Wednesday,a week before Taiwan’s anti-China reunification president is inaugurated for a second term.Since taking office,President Joseph Biden has sought to implement a stated intent to rejoin the JCPOA,including welcoming talks with Iran toward that end.Administration officials have acknowledged that a U.S.return to the agreement would entail an easing of the stipulated U.S. economic sanctions.`,
  "尽管五角大楼发言人拒绝对这份报告发表评论，但《防务新闻》暗示，该报告内容与美国防长埃斯珀近来的讲话相呼应：五角大楼希望不再强调航母是其海军力量投射的核心，而把更多重点放在无人技术上。",
  "“罗斯福”号航母访问越南的计划在访问前几周就得到了美国军方高层的批准，其中包括印太司令部司令菲尔·戴维森上将。",
  "ABM-X-3 反弹道导弹分层防御系统，是原苏联在莫斯科附近部署的一种新型反弹道导弹防御系统。",
  "得知情况后，中国信保靠前服务，主动与江苏甬金加强沟通，利用短期出口信用保险帮助企业转变贸易方式，成功获得订单。"
];
const entyAttrExct = [
  "福特级航母花费了130亿美元打造，它的全长也达到了337米，排水量更是恐怖，高达11.2万吨。而且福特级航母，搭载了许多新兴科技，与传统的航母有着天壤之别，它主要搭载了电磁轨道炮，高能激光，高能射线等等高科技技术，这些就已经足够了，给其他国家造成海上威慑力。",
  "如今的福特级航母，舰长337米、飞行甲宽77米，吃水12米、满载排水量高达112000吨，最高航速30节，最多可携带82架舰载机为航母提供制空权和制海权，动力方面；采用了两套A1B核反应堆为其提供动力。从这样一组数据上不难出，福特级航母简直就是一个可移动的海上小镇。",
  "作为美军的第三代核动力航母，福特级并没有令美军失望，首先就是在舰体上面有了明显增加，本身航母就以体型庞大而受到关注，再次加大后会更加的具有优势。据悉，全新的福特级总长度为332米，而宽度也达到了77.5米，吃水深度则保障在11.3米。仅是体型增大并不值得过度关注，但是这款新型航母的许多先进性能，是许多国家短时间内无法超越的，同时也是各国极为羡慕的。",
  "福特级航母的满载排水量可以达到10万吨左右，而航速更是可以保障在33节，虽然速度较快，但是航母的无限续航里程并不会受到影响。为了保障这款航母的作战能力，直接将其舰载机升级为五代舰载机，可以具备隐身能力，据悉这款航母上面可以实现携带80余架各类型舰载机的效果，可想而知其打击能力会何等出色。而美军为了保障舰载机的成功起降，直接采用了最为先进的电磁弹射技术。",
  "博尔顿多次公开表示无条件支持特朗普的外交和国安理念。对华态度方面，博尔顿无疑是强硬的，坚决支持特朗普对华开展贸易战和加征关税，将其描述为逼中国就范的“休克疗法”。",
  "The length of the Gerald R. Ford-class aircraft carriers is about 1,106 feet , it is about 39 feet  wide and 250 feet high . It has 25 floors, displaces 100,000 tons and has a speed of 30 knots .",
  "如今的福特级航母，舰长337米、飞行甲宽77米，吃水12米、满载排水量高达112000吨，最高航速30节，最多可携带82架舰载机为航母提供制空权和制海权，动力方面；采用了两套A1B核反应堆为其提供动力。从这样一组数据上不难出，福特级航母简直就是一个可移动的海上小镇。"
];
const entyRelaExct = [
  `4月5日，据海军新闻发言人高秀成大校介绍，日前，中国海军组织辽宁舰航母编队在台湾周边海域进行训练，这是根据年度工作计划组织的例行性训练，旨在检验部队训练成效，有利于提高维护国家主权、安全、发展利益的能力。今后，中国海军仍将按计划常态组织类似演训活动。对于有关国家派遣舰机到南海开展行动，国防部新闻发言人任国强大校曾表示，当前，在地区国家的共同努力下，南海局势总体稳定，根本不存在所谓航行自由问题。地区国家和国际社会都看得很清楚，南海面临的安全风险主要来自域外。我们希望有关国家多为维护地区和平稳定作出建设性贡献，而不要无事生非、制造麻烦。`,
  `报道还提到，4月29日，两架B-1B轰炸机曾从美国本土远程奔赴中国南海参加演习。`,
  `AN/FPS—115相控阵雷达作用距离为4800千米，工作频率为特高频、L波段；天线扫描方位角为240°、仰角85°；雷达发射彼束宽2°，接收波束宽2.2°；天线阵面直径306米；阵面单元2677个。`,
  `VIIC型潜艇自1941年以来就是二战中德国潜艇部队的主力，在整个大战期间它的建造工作就一直没有终止过。`,
  `作为参与条例制定工作的成员之一，天津市大气污染防治重点实验室高级工程师姚立英对三地协同立法深有感触：“条例是京津冀首个协同立法项目，三地克服机动车和非道路移动机械管理政策和制度基础的差异、机动车和非道路移动机械存量现状的差异，多次开展座谈会、联席会、协调会、论证会，最终条例不仅体现了京津冀三地协同，也根据三地各自实际情况做了有针对性的保留。”`
];
const evenClass = [
  `挪威军舰撞船事故或由人为因素造成。
  挪威事故调查委员会29日发表的初步调查报告显示，本月早些时候发生的挪威海军护卫舰和在马耳他注册的希腊油轮相撞事故可能是人为因素造成。
  这份报告说，初步评估认为此次事故并非由单一行为造成，而是牵涉“一系列相互作用的复杂因素和情形”。就目前的调查情况来看，没有发现技术系统有出现故障的情况。
  报告指出，事故发生前，“黑尔格·英斯塔”号护卫舰的船员未能把正在离港的“Sola TS”号油轮上的灯光与岸上的灯光分辨开来，误以为该油轮是一个固定物体。起航后的油轮继续使用甲板灯光意味着护卫舰船员无法看到油轮上的导航灯。
  此外，在油轮导航员和船舶交通服务中心要求护卫舰采取行动避免碰撞时，护卫舰船员仍把油轮当成固定物体，并误以为自己正与雷达中出现的其他船只通话。
  挪威事故调查委员会强调，这是一份初步调查报告，可能与事实仍存在误差。调查人员还需进一步深入调查。`,
  `俄表示正制造水陆两栖“道尔-M2”防空导弹系统。
  新华社莫斯科6月15日电（记者吴刚）俄罗斯防空兵司令亚历山大·列奥诺夫15日说，俄正制造新型水陆两栖“道尔-M2”防空导弹系统。
  列奥诺夫在接受俄《国家防务》杂志采访时说，新型“道尔-M2”防空导弹系统的底盘由履带式改为轮式，主要特点是具备水陆两栖能力。
  列奥诺夫指出，“道尔-M2”防空导弹系统至今仍然是俄陆军防空兵用于打击敌方高精准武器的主要战术武器装备。自2015年在叙利亚开展战斗值班以来，该系统共击落敌方45架无人机。目前，俄国防部与“道尔-M2”防空导弹系统生产商签署的采购合同能够保证该系统持续供应俄防空兵至2027年。
  俄罗斯“道尔”系列防空导弹系统是一款由阿尔玛兹-安泰军工集团研制的全天候中低空防空导弹系统，可对中低空固定翼飞机、直升机、无人机、巡航导弹甚至短程弹道导弹等进行拦截。`,
  `古特雷斯任命新的联合国中东和平进程特别协调员。
  新华社联合国12月21日电（记者尚绪谦）联合国秘书长古特雷斯的发言人21日宣布，古特雷斯当天任命挪威外交官托尔·文内斯兰为新任联合国中东和平进程特别协调员，接替即将离任的姆拉德诺夫。
  文内斯兰是挪威资深外交官，现任挪威的中东和平进程特别代表。文内斯兰1983年进入挪威外交部工作，长期负责中东事务，2007年至2011年担任挪威驻巴勒斯坦民族权力机构代表，2012年至2015年担任挪威驻埃及和利比亚大使。
  姆拉德诺夫2015年起担任联合国中东和平进程特别协调员，将于明年1月卸任，改任联合国秘书长利比亚问题特别代表`,
  `以色列战机轰炸加沙地带哈马斯军事目标。
  以色列战机5日晚对巴勒斯坦伊斯兰抵抗运动（哈马斯）位于加沙地带的军事目标进行了轰炸。
  以色列国防军发表声明说，一枚火箭弹当晚从加沙地带发射至以色列境内。作为回应，以军战机对加沙地带南部一处哈马斯军事哨所进行了轰炸。
  目前尚无任何组织或个人宣称制造了火箭弹袭击事件。据以色列媒体报道，此次火箭弹袭击没有造成以方人员伤亡。
  以色列国防军在另一份声明中说，3名巴勒斯坦男子5日晚在约旦河西岸城市杰宁附近向以军哨所投掷燃烧瓶，以军士兵开枪打死一名巴勒斯坦人，并对另外两人展开搜寻。
  在美国撮合下，以色列9月15日与阿联酋和巴林在美国白宫签署关系正常化协议。相关协议遭到巴勒斯坦各方的反对。
  今年8月初以来，哈马斯武装向以色列方向发射火箭弹和放飞带有纵火装置的气球。作为回应，以军连续多日对哈马斯军事目标进行炮击和空袭。在卡塔尔的斡旋下，双方于8月31日达成谅解协议，以遏制地区紧张局势升级`,
  `厄瓜多尔签约购买中国科兴公司新冠疫苗。
  厄瓜多尔卫生部长塞瓦略斯25日宣布，厄瓜多尔政府已与中国科兴公司签署新冠疫苗采购协议。
  塞瓦略斯当天在新闻发布会上表示，与中国科兴公司签署新冠疫苗采购协议对厄瓜多尔是重大利好消息，有助于厄瓜多尔尽快开展大规模疫苗接种，提高疫苗接种率。
  塞瓦略斯说，科兴公司研发的新冠疫苗已获得厄瓜多尔医药监管部门许可，首批科兴疫苗将于3月运抵厄瓜多尔，其余疫苗将在4月交付。
  中国驻厄瓜多尔大使馆经济商务参赞陈峰表示，科兴公司是首个与厄方达成新冠疫苗供应协议的中国疫苗企业，其提供的疫苗将极大缓解厄瓜多尔当前面临的新冠疫苗短缺局面，有效助力厄方抗击新冠疫情。
  厄瓜多尔卫生部25日发布的数据显示，该国过去24小时新增新冠确诊病例2390例，累计确诊281169例；新增死亡病例46例，累计死亡10929例。`,
  `北马其顿总统、总理会见魏凤和。
  3月30日，北马其顿总统彭达罗夫斯基、总理扎埃夫在斯科普里分别会见到访的中国国务委员兼国防部长魏凤和。
  彭达罗夫斯基说，北马与中国彼此信任，双边关系友好。北马坚定支持一个中国政策，对共建“一带一路”充满信心。北马方赞赏中国抗疫取得巨大成就，感谢中国给予的抗疫援助。期待在疫情好转后，两国开展更加频繁深入的交流与合作。
  扎埃夫说，北马独立以来，得到中国巨大支持和帮助，北马方对此深表感谢。两国合作潜力巨大，北马希望与中国加强在经贸、投资、基建以及防务安全等各领域合作，推动两国关系健康稳定发展。
  魏凤和介绍了中国疫情防控、经济社会发展和中美关系情况，阐明了在台湾、香港、新疆等问题上的原则立场。他说，中方赞赏北马方坚定奉行一个中国政策，希望北马在涉及中国核心利益问题上继续给予支持。中方愿与北马方一道，充分利用“一带一路”和“17+1”平台深化务实合作，实现互利共赢、共同发展。中国军队重视发展同北马军队关系，致力于深化交流合作，推动两军关系走深走实。
  当天，魏凤和与北马其顿国防部长舍凯琳斯卡举行会谈，就两国两军关系及国际和地区安全形势深入交换意见。`
];

export { entyExct, entyAttrExct, entyRelaExct, evenClass };
