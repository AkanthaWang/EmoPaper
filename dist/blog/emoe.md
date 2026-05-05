> **EMOE** 旨在解决多模态情感识别（MER）中的核心挑战。
> **paper:** https://openaccess.thecvf.com/content/CVPR2025/papers/Fang_EMOE_Modality-Specific_Enhanced_Dynamic_Emotion_Experts_CVPR_2025_paper.pdf
> **code:** https://github.com/fuyyyyy/EMOE

# 核心问题与动机
在多模态情感识别（如视觉、声学和语言）中，现有的融合方法面临两个主要困境 ：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/71207fec5d794be0af5b203970592ea4.png#pic_center)


* **模态平衡困境 (Modality Balance Dilemma)**：不同模态在不同样本中的重要性是动态变化的。如上图(a)，某人可能通过文字表达情感，而另一人则更多依靠面部表情。现有方法通常对所有样本使用统一的融合范式，忽视了这种样本级别的差异。
* **模态特殊性丧失 (Modality Specialization Disappearance)**：多模态融合往往过于关注各模态间的“共同特征”（不变特征），而忽视了单模态数据本身具有的预测能力（特定特征），见上图(b)。

# 核心思想
EMOE 的核心思想是实现**样本自适应的动态融合**，并利用**单模态的预测能力来增强融合特征**。通过“专家混合”机制让模型自动学习每个样本的模态权重，并结合“知识蒸馏”确保多模态特征中保留了单模态的独有优势。

# 方法介绍
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9bf9b8efbf3244f88efb3f98e8b4f873.png)
> **EMOE**模型首先接收输入样本的语言、视觉和声学数据，通过各自的编码器将原始序列映射为高维特征表示，并由对应的单模态分类头计算单模态损失 $\mathcal{L}_{uni}$ 以确保各分支具备独立的预测能力，随后将三个模态的特征拼接后送入一个受路由器熵损失和权重重要性相似度损失（$\mathcal{L}_{balance}$）约束的轻量级路由网络，生成能够反映样本特性且分布合理的动态权重，据此对模态特征进行加权组合形成多模态融合特征 $f_c$ 并送入多模态分类头得出由 $\mathcal{L}_{multi}$ 约束的情感预测结果，最后利用该动态权重对各单模态预测结果进行加权融合作为教师知识，通过单向知识蒸馏损失 $\mathcal{L}_{ud}$ 引导多模态特征进行对齐，从而在实现样本级动态融合的同时，有效地将各模态特有的预测优势注入到最终的决策中。

* **单模态蒸馏 (Unimodal Distillation, UD)**：
    * **预测引导**：为每个单模态添加分类头，计算单模态预测损失 $\mathcal{L}_{uni}$，确保单模态特征具备独立的预测能力。
    * **单向蒸馏**：利用路由网络学到的权重，将多模态融合预测与加权后的单模态预测进行对齐（蒸馏），使融合特征在学习共性的同时，也能捕捉到特定模态的预测优势。

* **模态专家混合 (Mixture of Modality Experts, MoME)**：
    * **路由网络 (Router Network)**：输入模态特征后，路由网络为每个样本学习一组动态权重 $W=\{w_l, w_v, w_a\}$，代表语言、视觉和声学模态的重要性。
    * **专家平衡机制**：为了防止模型过度依赖某一主导模态（如语言），引入了**路由器熵损失 (Router Entropy Loss)** 【防止模型过度依赖某一主导模态（如语言），鼓励模型自主激活其他模态专家】和**权重重要性相似度 (Weight-Importance Similarity)**【通过比较学习到的权重 $W$ 与基于单模态预测结果计算出的实际重要性系数 $I$，进一步辅助模态重要性的学习 】，以优化权重分布并保持各模态专家的活性。
+ **多模态特征融合**：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c930b6dd86c04c128d2f379d609204e0.png)
	+ 左方法为：$f_c = w_l \cdot f_l' + w_v \cdot f_v' + w_a \cdot f_a'$ （本文选取）
	+ 右方法为：$f_c = [w_l \cdot f_l' , w_v \cdot f_v' , w_a \cdot f_a']$


+ 损失函数拆解总损失函数 $\mathcal{L}_{total}$ 是一个多目标优化组合，其公式通常表示为：$$\mathcal{L}_{total} = \underbrace{\mathcal{L}_{task}}_{\text{预测基础}} + \lambda_1 \underbrace{\mathcal{L}_{balance}}_{\text{路由规范}} + \lambda_2 \underbrace{\mathcal{L}_{ud}}_{\text{知识引导}}$$
	+ $\mathcal{L}_{task} = \mathcal{L}_{multi} + \mathcal{L}_{uni}$
	+ $\mathcal{L}_{balance} = \mathcal{L}_{entropy} + α\mathcal{L}_{sim}$
	+ 知识迁移：$\mathcal{L}_{ud}$（将单模态的强预测能力融入融合特征）。利用路由网络学到的权重 $W$，对三个单模态分支的预测结果（Logits）进行加权组合，形成一个综合性的“最优单模态预测” $z_{uni}$。计算融合后特征 $f_c$ 的多模态预测与上述 $z_{uni}$ 之间的 KL 散度，记为蒸馏损失 $\mathcal{L}_{ud}$。
# 数据集与实验
研究团队在三个基准数据集上验证了模型性能 ：
* **数据集**：
    * **CMU-MOSI**：2,199 个单口视频样本。
    * **CMU-MOSEI**：22,856 个 YouTube 电影评论片段。
    * **MIntRec**：包含 2,224 个多模态意图识别样本，用于验证模型的泛化性。
* **实验结果**：
    * 在 **CMU-MOSI** 上，EMOE 在对齐设置下的 7 分类准确率（ACC7）达到 **47.7%**，比对比方法 DMD 提升了 1.5%。在 **CMU-MOSEI** 上同样取得了优于 SOTA 方法的结果。
    ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/30f72c71d3154366b680330478becbe3.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/40b002667bb14271947034454ea617b1.png)
    * 消融实验证明，MoME 和 UD 模块均对提升性能有显著贡献。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/2da252be89d144c1847afd7576e50491.png#pic_center)
    * 效果图
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/dbc079edcfda43a7b5642d3bbd5e3121.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/20a8b732a2ba4a7b97deacafaf2bb032.png#pic_center)


# 主要贡献
1.  **样本级动态融合**：通过 MoME 为每个样本生成独特的权重分布，解决了模态重要性随样本变化的问题。
2.  **保留单模态预测能力**：提出带路由选择的单模态蒸馏，利用单模态信息引导融合特征学习，克服了模态特征被掩盖的问题。
3.  **多任务适用性**：不仅在情感识别（MER）上表现出色，还成功扩展到意图识别（MIR）任务，证明了其有效性和通用性。