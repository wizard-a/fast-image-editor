---
name: localStorage 本地存储
order: 12
group:
  path: /
nav:
  path: /proComponent
---

# LocalStorage 存储

使用


## add(添加)

```typescript
LocalStorage.add(key: string, value: any)
```
将传入的value以字符串的形式存储到window.localStorage的key字段当中

##### 参数

* `key`: (String) localStorage中的key
* `value`: (any)  localStorage中的key所存储的值

## addTag(根据tag增加最大存储条数功能)

```typescript
addTag: (key: String, value: Any, tag: String)
```
在window.localStorage的key中可添加多条value值。若添加的数量大于了指定的条数，则按照先进先出的规则进行对应的value项的删除


###### 示例


```typescript

LocalStorage.get('test')  //  zetGroup: {name: 'zetyun', age: 6} 
LocalStorage.addTag('test', {address: 'haidian'}, 'zetGroup') //  zetGroup: {name: 'zetyun', age: 6, address: 'haidian'} 
  

```


###### 参数

* `key`: (String) 存储的key
* `value`: (Any) 存储的value
* `tag`: (String) 所要追加数据的key

## get(读取)

```typescript
LocalStorage.get(key: string)
```
通过get方法获取window.localStorage的值，以json或者对象的格式返回

###### 参数
* `key`: (String) 传入要获取的

## remove (移除某一个值)

```typescript
LocalStorage.remove(key: string)
```

移除window.localStorage中的key值


## removeTag(清除标签项)

```typescript
LocalStorage.removeTag(key:string, tag: string)
```

在window.localStorage中查找到属性为key的值，并根据传递的tag进行删除


###### 参数

* `key`: (string)： 要删除window.localStorage的key
* `tag`：要删除的标签


######  示例


```typescript

LocalStorage.get('tagGroup')  //  {name: 'zetyun', age: 6}

LocalStorage.removeTag('tagGroup', 'age'); // tagGroup: {name: 'zetyun'}



```



## clear (移除所有的项)

```typescript
LocalStorage.clear()
```

移除window.localStorage中所有的值
